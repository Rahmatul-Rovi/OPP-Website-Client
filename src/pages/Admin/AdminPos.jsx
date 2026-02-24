import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { HiSearch, HiOutlineTrash, HiPlus, HiMinus, HiOutlineShoppingCart } from 'react-icons/hi';
import Swal from 'sweetalert2';

const AdminPos = () => {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Fix: Eita missing silo

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data);
      } catch (err) {
        console.error("POS Data Load Error", err);
      }
    };
    fetchProducts();
  }, []);

  // ================= SEARCH FILTER LOGIC =================
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= CART LOGIC =================
  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  // Calculations
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ================= CHECKOUT HANDLER =================
  const handleCheckout = async () => {
    if (cart.length === 0) return Swal.fire('Empty!', 'Cart-e kisu nai.', 'warning');

    setLoading(true); // ✅ Ekhon eita kaj korbe
    try {
      // Backend-e data pathano
      await axios.post('http://localhost:5000/api/checkout', {
        cart: cart,
        totalAmount: subTotal,
      });

      Swal.fire({
        title: 'Order Placed!',
        text: `Total: ৳${subTotal} - Stock updated.`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Print Receipt',
      }).then((result) => {
        if (result.isConfirmed) {
          window.print();
        }
      });

      setCart([]); 
      // Updated stock fetch kora
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);

    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Checkout failed!', 'error');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-screen bg-[#F3F4F6]">
      
      {/* 🟢 LEFT SIDE: PRODUCT SELECTION */}
      <div className="lg:w-2/3 p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black">Elite POS Terminal</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-[4px]">Direct Inventory Sales</p>
        </div>

        {/* --- PREMIUM SEARCH BAR --- */}
        <div className="relative mb-8 shadow-sm">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            type="text" 
            placeholder="Search by product name (Type 'p', 's', 't' to filter)..." 
            className="w-full pl-12 pr-4 py-5 bg-white border-none outline-none focus:ring-2 ring-black font-bold transition-all shadow-lg text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {filteredProducts.map(p => (
            <div 
              key={p._id} 
              onClick={() => addToCart(p)} 
              className="bg-white group relative overflow-hidden border-2 border-transparent hover:border-black cursor-pointer transition-all duration-300 shadow-md p-0"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h4 className="text-[11px] font-black uppercase truncate tracking-tighter">{p.title}</h4>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-black italic">৳{p.price}</p>
                  <span className="text-[9px] bg-gray-100 px-2 py-1 font-bold">STOCK: {p.stock}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-black text-white p-2 rounded-full shadow-xl"><HiPlus /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔴 RIGHT SIDE: BILLING PANEL */}
      <div className="lg:w-1/3 bg-white shadow-[-10px_0px_30px_rgba(0,0,0,0.05)] flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b-2 border-gray-50 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-[3px] flex items-center gap-2">
            <HiOutlineShoppingCart className="text-xl"/> Current Order
          </h3>
          <span className="bg-black text-white text-[10px] px-2 py-1 font-black">{cart.length} ITEMS</span>
        </div>

        {/* --- CART ITEMS --- */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20 italic">
              <HiOutlineShoppingCart size={60} />
              <p className="text-xs uppercase font-bold mt-4 tracking-widest">Awaiting selection...</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 items-center bg-gray-50 p-3 border-l-4 border-black group">
                <img src={item.image} className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                <div className="flex-grow">
                  <h5 className="text-[10px] font-black uppercase truncate w-32">{item.title}</h5>
                  <p className="text-xs font-bold mt-1">৳{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-200 px-2 py-1">
                  <button onClick={() => updateQuantity(item._id, -1)} className="hover:text-red-500"><HiMinus size={12}/></button>
                  <span className="text-xs font-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="hover:text-green-500"><HiPlus size={12}/></button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-600 transition-colors">
                  <HiOutlineTrash size={18}/>
                </button>
              </div>
            ))
          )}
        </div>

        {/* --- TOTAL & CHECKOUT --- */}
        <div className="p-8 bg-black text-white">
          <div className="space-y-2 mb-6 opacity-80">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span>Subtotal:</span>
              <span>৳{subTotal}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-8 border-t border-white/20 pt-4">
            <span className="text-xs font-bold uppercase opacity-60">Grand Total</span>
            <span className="text-4xl font-black italic tracking-tighter text-yellow-400">৳{subTotal.toLocaleString()}</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={loading} // Loading hole button off thakbe
            className="w-full bg-white text-black py-5 font-black uppercase tracking-[5px] text-xs hover:bg-yellow-400 transition-all active:scale-95 shadow-xl disabled:bg-gray-500"
          >
            {loading ? 'Processing...' : 'Finalize & Print'}
          </button>
          
          <button 
            onClick={() => setCart([])}
            className="w-full text-[9px] font-black uppercase tracking-widest mt-6 opacity-40 hover:opacity-100 transition-opacity"
          >
            Discard Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPos;