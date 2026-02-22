import React, { useState } from 'react';

const AdminPos = () => {
  const [cart, setCart] = useState([]);
  
  // Dummy data (Pore server theke ashbe)
  const products = [
    { id: 1, title: 'Formal Shirt', price: 1500 },
    { id: 2, title: 'Premium Polo', price: 1200 },
    { id: 3, title: 'Denim Pant', price: 2200 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Product Selection */}
      <div className="lg:w-2/3">
        <h2 className="text-xl font-black uppercase mb-6 tracking-tighter italic">Point of Sale (POS)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} onClick={() => addToCart(p)} 
              className="bg-white p-4 border border-gray-100 hover:border-black cursor-pointer transition text-center shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-tight">{p.title}</h4>
              <p className="text-sm font-bold text-gray-500 mt-2">৳{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Billing */}
      <div className="lg:w-1/3 bg-white p-6 border border-gray-100 shadow-xl min-h-[500px] flex flex-col">
        <h3 className="text-sm font-black uppercase border-b pb-4 mb-4 tracking-widest">Order Summary</h3>
        
        <div className="flex-grow overflow-y-auto">
          {cart.length === 0 ? <p className="text-xs text-gray-400 text-center mt-10 uppercase tracking-widest">Cart is empty</p> : 
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-3 text-sm">
                <span>{item.title}</span>
                <span className="font-bold">৳{item.price}</span>
              </div>
            ))
          }
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-lg font-black">
            <span>TOTAL:</span>
            <span>৳{totalPrice}</span>
          </div>
          <button className="w-full bg-blue-600 text-white mt-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-blue-700">
            Checkout & Print
          </button>
          <button onClick={() => setCart([])} className="w-full text-red-500 text-[10px] font-bold mt-4 uppercase tracking-widest">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPos;