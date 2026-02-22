import React, { useState } from 'react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '', price: '', category: '', image: '', stock: '', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving to Database:", formData);
    // Eikhane axios.post('/api/products', formData) hobe jokhon backend ready hobe
    alert("Product added successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Product Title</label>
          <input type="text" required className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition"
            onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Price (BDT)</label>
          <input type="number" required className="w-full border-b border-gray-200 py-2 outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, price: e.target.value})} />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock</label>
          <input type="number" required className="w-full border-b border-gray-200 py-2 outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, stock: e.target.value})} />
        </div>

        <div className="col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Image URL (Paste Link Here)</label>
          <input type="text" required placeholder="Paste ImgBB or any direct image link"
            className="w-full border-b border-gray-200 py-2 outline-none focus:border-black"
            onChange={(e) => setFormData({...formData, image: e.target.value})} />
          
          {/* Real-time Image Preview */}
          {formData.image && (
            <div className="mt-4">
              <p className="text-[9px] uppercase mb-2">Image Preview:</p>
              <img src={formData.image} alt="Preview" className="h-32 w-32 object-cover border p-1" />
            </div>
          )}
        </div>

        <button className="col-span-2 mt-6 bg-black text-white py-4 text-xs font-bold uppercase tracking-[3px] hover:bg-gray-800 transition">
          Save Product to DB
        </button>
      </form>
    </div>
  );
};

export default AddProduct;