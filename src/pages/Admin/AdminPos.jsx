import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { HiSearch, HiOutlineTrash, HiPlus, HiMinus, HiOutlineShoppingCart } from 'react-icons/hi';
import { Printer } from 'lucide-react';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';

const AdminPos = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  const componentRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const generateInvoiceNumber = () => `INV${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    setInvoiceNumber(generateInvoiceNumber());
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (err) {
      console.error("POS Data Load Error", err);
    }
  };

  // 🟢 Helper: Discounted Price Calculate Korar Jonne
  const getEffectivePrice = (product) => {
    const mainPrice = Number(product.price || 0);
    const discPercent = Number(product.discount || 0);
    if (discPercent > 0) {
      return mainPrice - (mainPrice * discPercent / 100);
    }
    return mainPrice;
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Receipt_${invoiceNumber}`,
  });

 const filteredProducts = products.filter(p => {
    // Search term-ke alada kora
    const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term !== "");

    // Jodi search box khali thake, shob product dekhaw
    if (searchTerms.length === 0) return true;

    return searchTerms.every(term => {
        const titleMatch = p.title?.toLowerCase().includes(term);
        
        // 🟢 Safe check: price thaklei toString hobe, naile khali string hobe
        const priceString = (p.price !== null && p.price !== undefined) ? p.price.toString() : "";
        const priceMatch = priceString.includes(term);

        return titleMatch || priceMatch;
    });
});

  const addToCart = (product) => {
    if (product.stock <= 0) {
      return Swal.fire("Out of Stock", "Product stock-e nai!", "warning");
    }

    // Discounted price calculate kore cart-e pathacci
    const priceToCharge = getEffectivePrice(product);

    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Cart-e price hobe discounted price
      setCart([...cart, { ...product, price: priceToCharge, quantity: 1 }]);
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

  const subTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const handleCheckout = async () => {
    if (cart.length === 0) return Swal.fire('Empty!', 'Cart-e kisu nai.', 'warning');
    
    setLoading(true);
    try {
      const payload = {
        invoiceNo: invoiceNumber,
        customerName: customer.name || "Walk-in Guest",
        customerPhone: customer.phone || "N/A",
        cart: cart,
        totalAmount: subTotal,
      };

      const res = await axios.post('http://localhost:5000/api/checkout', payload);

      if (res.status === 200 || res.status === 201) {
        await Swal.fire({
          title: 'Order Placed!',
          icon: 'success',
          timer: 800,
          showConfirmButton: false
        });
        
        handlePrint();

        setTimeout(() => {
          setCart([]);
          setCustomer({ name: "", phone: "" });
          setInvoiceNumber(generateInvoiceNumber());
          fetchProducts();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Checkout failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <div className="flex flex-col lg:flex-row gap-0 min-h-screen print:hidden">
        
        {/* LEFT SIDE: PRODUCTS */}
        <div className="lg:w-2/3 p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black">ONE POINT PLUS</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-[4px]">Operator: {user?.name || "Admin"}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400">INVOICE NO</p>
                <p className="font-black text-black">#{invoiceNumber}</p>
            </div>
          </div>

          <div className="relative mb-8">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input 
              type="text" 
              placeholder="Search product..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl outline-none focus:ring-2 ring-black font-bold shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh] pr-2">
            {filteredProducts.map(p => {
              const currentPrice = getEffectivePrice(p);
              const hasDiscount = Number(p.discount) > 0;

              return (
                <div key={p._id} onClick={() => addToCart(p)} className="bg-white group rounded-xl overflow-hidden border-2 border-transparent hover:border-black cursor-pointer transition-all shadow-sm relative">
                  {hasDiscount && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-full z-10">
                      -{p.discount}%
                    </span>
                  )}
                  <div className="aspect-square bg-gray-100">
                    <img src={p.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-[11px] font-black uppercase truncate">{p.title}</h4>
                    <div className="flex justify-between items-end mt-1">
                      <div>
                        {hasDiscount && (
                          <p className="text-[9px] text-gray-400 line-through">৳{p.price}</p>
                        )}
                        <p className="text-sm font-black text-black">৳{currentPrice}</p>
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Stock: {p.stock}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: BILLING */}
        <div className="lg:w-1/3 bg-white shadow-2xl flex flex-col h-screen sticky top-0">
          <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="text-sm font-black uppercase flex items-center gap-2"><HiOutlineShoppingCart/> Order List</h3>
            <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full">{cart.length}</span>
          </div>

          <div className="p-4 space-y-2 border-b">
            <input 
              type="text" required placeholder="Customer Name" 
              className="w-full text-xs p-2 bg-gray-100 rounded outline-none"
              value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})}
            />
            <input 
              type="text" required placeholder="Phone Number" 
              className="w-full text-xs p-2 bg-gray-100 rounded outline-none"
              value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})}
            />
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-lg">
                <div className="flex-grow">
                  <h5 className="text-[10px] font-black uppercase truncate w-32">{item.title}</h5>
                  <p className="text-xs font-bold">৳{item.price * item.quantity}</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border">
                  <button onClick={() => updateQuantity(item._id, -1)}><HiMinus size={10}/></button>
                  <span className="text-xs font-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)}><HiPlus size={10}/></button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-400"><HiOutlineTrash size={16}/></button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-black text-white">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase opacity-60">Total Amount</span>
              <span className="text-3xl font-black text-yellow-400">৳{subTotal}</span>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : <><Printer size={18}/> Finalize & Print</>}
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 THERMAL RECEIPT SECTION */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div ref={componentRef} className="p-4 text-black bg-white w-[80mm] font-mono">
          <div className="text-center border-b border-dashed border-black pb-2 mb-2">
            <h1 className="text-lg font-bold">ONE POINT PLUS</h1>
            <p className="text-[10px]">Aurangzeb Road, Pabna</p>
            <div className="border-b border-black border-dashed my-2"></div>
            <p className="font-bold uppercase">Cash Receipt</p>
          </div>

          <div className="mb-2 space-y-1 text-[10px]">
            <div className="flex justify-between font-bold">
              <span>Inv: #{invoiceNumber}</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <p>Customer: {customer.name || "Walk-in"}</p>
            <p>Phone: {customer.phone || "N/A"}</p>
          </div>

          <div className="border-t border-b border-black border-dashed py-2 my-2">
            <div className="flex justify-between font-bold mb-1 text-[10px]">
              <span className="w-1/2">Item</span>
              <span className="w-1/4 text-center">Qty</span>
              <span className="w-1/4 text-right">Price</span>
            </div>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-[10px] leading-tight mb-1">
                <span className="w-1/2 uppercase truncate">{item.title}</span>
                <span className="w-1/4 text-center">{item.quantity}</span>
                <span className="w-1/4 text-right">৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-black text-[12px] mt-2 border-t pt-2 border-double border-black">
            <span>TOTAL</span>
            <span>৳{subTotal}.00</span>
          </div>

          <div className="mt-8 text-center pt-4 border-t border-dashed border-black">
            <p className="font-bold uppercase">Thank You!</p>
            <p className="text-[9px]">Exchange possible within 3 days (with receipt)</p>
            <p className="text-[10px] mt-2 font-black italic">ONE POINT PLUS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPos;