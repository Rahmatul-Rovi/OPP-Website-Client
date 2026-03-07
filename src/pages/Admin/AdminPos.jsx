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
  const [manualDiscount, setManualDiscount] = useState(0); 
  
  const componentRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const generateInvoiceNumber = () => `INV${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    setInvoiceNumber(generateInvoiceNumber());
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://opp-server.vercel.app/products');
      setProducts(res.data);
    } catch (err) {
      console.error("POS Data Load Error", err);
    }
  };

  // Helper: Discounted Price Calculate 
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
    const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term !== "");

    if (searchTerms.length === 0) return true;

    return searchTerms.every(term => {
        const titleMatch = p.title?.toLowerCase().includes(term);
        
        const priceString = (p.price !== null && p.price !== undefined) ? p.price.toString() : "";
        const priceMatch = priceString.includes(term);

        return titleMatch || priceMatch;
    });
});

  const addToCart = (product) => {
    if (product.stock <= 0) {
      return Swal.fire("Out of Stock", "Product stock-e nai!", "warning");
    }

    // Discounted price calculate kore cart-e add
    const priceToCharge = getEffectivePrice(product);

    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Cart-e price discounted price
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

const finalPayable = useMemo(() => {
  const discountAmount = (subTotal * Number(manualDiscount)) / 100;
  return subTotal - discountAmount;
}, [subTotal, manualDiscount]);

  const handleCheckout = async () => {
    if (cart.length === 0) return Swal.fire('Empty!', 'Cart-e kisu nai.', 'warning');
    
    setLoading(true);
    try {
      const payload = {
        invoiceNo: invoiceNumber,
        customerName: customer.name || "Walk-in Guest",
        customerPhone: customer.phone || "N/A",
        cart: cart,
        totalAmount: finalPayable,
      discountPercent: manualDiscount
      };

      const res = await axios.post('https://opp-server.vercel.app/api/checkout', payload);

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
           <h2 className="text-3xl font-black uppercase tracking-tighter italic text-red-600 flex items-center">
  ONE POINT 
  <span className="text-5xl ml-1 mb-3 inline-block not-italic font-black text-red-600">
    +
  </span>
</h2>
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
<div className="lg:w-1/3 bg-white shadow-2xl flex flex-col h-screen sticky top-0 border-l border-slate-200">
  
  {/* Header */}
  <div className="p-6 bg-white border-b flex justify-between items-center">
    <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2 text-slate-800">
      <HiOutlineShoppingCart className="text-indigo-600"/> Order Summary
    </h3>
    <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg shadow-indigo-100">
      {cart.length} Items
    </span>
  </div>

  <div className="p-6 space-y-4 bg-slate-50/50 border-b">
    <div>
      <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block ml-1">Customer Details</label>
      <input 
        type="text" 
        placeholder="ENTER CUSTOMER NAME" 
        className="w-full text-sm font-bold p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300 uppercase"
        value={customer.name} 
        onChange={(e) => setCustomer({...customer, name: e.target.value})}
      />
    </div>
    <input 
      type="number" 
      placeholder="PHONE NUMBER (11 DIGITS)" 
      className="w-full text-sm font-bold p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-300"
      value={customer.phone} 
      onChange={(e) => setCustomer({...customer, phone: e.target.value})}
    />
  </div>

  <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
    {cart.length > 0 ? cart.map((item) => (
      <div key={item._id} className="flex gap-4 items-center bg-white border border-slate-100 p-3 rounded-2xl hover:shadow-md transition-shadow">
        <div className="flex-grow">
          <h5 className="text-[11px] font-black uppercase text-slate-800 leading-tight mb-1">{item.title}</h5>
          <p className="text-sm font-black text-indigo-600">৳{item.price * item.quantity}</p>
        </div>
        
        {/* Counter */}
        <div className="flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
          <button onClick={() => updateQuantity(item._id, -1)} className="hover:text-indigo-600 transition-colors"><HiMinus size={12}/></button>
          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item._id, 1)} className="hover:text-indigo-600 transition-colors"><HiPlus size={12}/></button>
        </div>
        
        <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
          <HiOutlineTrash size={20}/>
        </button>
      </div>
    )) : (
      <div className="h-full flex flex-col items-center justify-center text-slate-300">
        <HiOutlineShoppingCart size={48} className="mb-2 opacity-20"/>
        <p className="text-[10px] font-black uppercase tracking-widest">Cart is empty</p>
      </div>
      
    )}
  </div>
  {/* Discount Section */}
<div className="p-4 bg-red-50/50 border-b border-red-100">
  <label className="text-[10px] font-black uppercase text-red-400 mb-1 block ml-1">Extra Discount (%)</label>
  <div className="relative">
    <input 
      type="number" 
      placeholder="0" 
      className="w-full text-sm font-black p-3 bg-white border-2 border-red-100 rounded-xl outline-none focus:border-red-500 transition-all"
      value={manualDiscount} 
      onChange={(e) => setManualDiscount(e.target.value)}
      min="0"
      max="100"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-red-400">%</span>
  </div>
</div>

  <div className="p-8 bg-white border-t-2 border-slate-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
    <div className="flex justify-between items-center mb-6">
      <div>
        <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">Payable Amount</span>
        <span className="text-3xl font-black text-slate-900 tracking-tighter">৳{finalPayable}</span>
      </div>
      <div className="text-right">
         <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded">-{manualDiscount}% OFF</span>
      </div>
    </div>
    
   <button 
  onClick={() => {
    // Validation: Name ba Phone missing  SweetAlert Error
    if (!customer.name || !customer.phone) {
      Swal.fire({
        title: 'Missing Information!',
        text: 'Please provide customer name and phone number to proceed.',
        icon: 'warning',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'Got it!',
        background: '#ffffff',
        customClass: {
          title: 'font-black uppercase tracking-tight',
          popup: 'rounded-[24px]',
          confirmButton: 'rounded-xl px-6 py-3 font-bold uppercase text-xs'
        }
      });
      return;
    }

    // Success check before final checkout
    Swal.fire({
      title: 'Finalize Order?',
      text: "Are you sure you want to complete this transaction?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#000000',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'YES, PRINT NOW',
      cancelButtonText: 'NO, WAIT',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[32px]',
        confirmButton: 'rounded-2xl px-6 py-3 font-black text-xs uppercase',
        cancelButton: 'rounded-2xl px-6 py-3 font-black text-xs uppercase text-slate-400'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleCheckout(); 
      }
    });
  }} 
  disabled={loading || cart.length === 0}
  className={`w-full py-5 rounded-[20px] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
    (!customer.name || !customer.phone || cart.length === 0) 
    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
    : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black'
  }`}
>
  {loading ? (
    <span className="animate-pulse italic">Processing...</span>
  ) : (
    <><Printer size={18} className="text-indigo-400"/> Finalize & Print Receipt</>
  )}
</button>
  </div>
</div>
      </div>

  {/*  THERMAL RECEIPT SECTION */}
<div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
  <div id="printable-receipt" ref={componentRef} className="p-4 text-black bg-white w-[80mm] font-mono">
    
    <div className="text-center border-b border-dashed border-black pb-2 mb-2">
      <h1 className="text-xl font-bold uppercase">ONE POINT PLUS</h1>
      <p className="text-[10px]">City Centre, Ground Floor Aurangzeb Road, Pabna</p>
      <div className="border-b border-black border-dashed my-2"></div>
      <p className="font-bold uppercase">Cash Receipt</p>
    </div>

    <div className="mb-1 space-y-1 text-[9px] text-left"> 
      <div className="flex justify-between font-bold text-[9px]"> 
        <span>Inv: #{invoiceNumber}</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <div className="border-b border-black border-dotted my-1"></div>
      <p className="truncate">Customer: {customer.name || "Walk-in"}</p>
      <p className="truncate">Phone: {customer.phone || "N/A"}</p>
    </div>

    {/* Items List */}
    <div className="border-t border-b border-black border-dashed py-2 my-2">
      <div className="flex justify-start font-bold mb-1 text-[10px]">
        <span className="w-1/2 text-left">Item</span>
        <span className="w-1/4 text-center">Qty</span>
        <span className="w-1/4 text-right">Price</span>
      </div>
      {cart.map((item, i) => (
        <div key={i} className="flex justify-start text-[10px] leading-tight mb-1">
          <span className="w-1/2 text-left uppercase truncate">{item.title}</span>
          <span className="w-1/4 text-center">{item.quantity}</span>
          <span className="w-1/4 text-right">৳{item.price * item.quantity}</span>
        </div>
      ))}
    </div>

    <div className="border-t border-black border-dashed pt-1 mt-2">
      <div className="flex justify-between text-[10px]">
        <span>Subtotal</span>
        <span>৳{subTotal}.00</span>
      </div>
      
      {manualDiscount > 0 && (
        <div className="flex justify-between text-[10px]">
          <span>Extra Discount ({manualDiscount}%)</span>
          <span>- ৳{(subTotal * manualDiscount) / 100}</span>
        </div>
      )}

      <div className="flex justify-between font-black text-[12px] mt-1 border-t border-black pt-1">
        <span>NET PAYABLE</span>
        <span>৳{finalPayable}.00</span>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-8 text-center pt-4 border-t border-dashed border-black">
      <p className="font-bold uppercase">Thank You!</p>
      <p className="text-[10px] mt-2 font-black italic">ONE POINT PLUS</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default AdminPos;