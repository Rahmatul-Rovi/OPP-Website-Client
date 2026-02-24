import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ekta shundor alert-er jonno (npm install sweetalert2)

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '', price: '', stock: '', image: '', category: 'General', description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🚀 Real-time connection with Backend
      const response = await axios.post('http://localhost:5000/products', formData);
      
      if (response.data.insertedId) {
        // Success Message
        Swal.fire({
          title: 'Success!',
          text: 'Product added to MongoDB successfully',
          icon: 'success',
          confirmButtonColor: '#000'
        });
        // Form Reset kora
        e.target.reset();
        setFormData({ title: '', price: '', stock: '', image: '', category: 'General', description: '' });
      }
    } catch (error) {
      console.error("Backend error:", error);
      Swal.fire('Error', 'Server connect hoy nai!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border border-gray-50 mt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Add New Product</h2>
        <div className="h-1 w-20 bg-black mx-auto mt-2"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {/* Title */}
        <div className="col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Product Title</label>
          <input 
            type="text" required 
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-all text-sm font-bold"
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
        </div>

        {/* Price */}
        <div className="col-span-1">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Price (BDT)</label>
          <input 
            type="number" required 
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-all text-sm font-bold"
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
          />
        </div>

        {/* Stock */}
        <div className="col-span-1">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Stock Quantity</label>
          <input 
            type="number" required 
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-all text-sm font-bold"
            onChange={(e) => setFormData({...formData, stock: e.target.value})} 
          />
        </div>

        {/* Image Link */}
        <div className="col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-2 block">Image URL (ImgBB/Cloudinary)</label>
          <div className="flex gap-4 items-center">
            <input 
                type="text" required 
                placeholder="Paste your image link here..."
                className="flex-grow border-b-2 border-gray-100 py-3 outline-none focus:border-black transition-all text-sm font-light italic"
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
            />
            {formData.image && (
                <div className="h-16 w-16 border-2 border-black p-1 bg-white overflow-hidden shadow-lg">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          disabled={loading}
          className={`col-span-2 mt-8 py-5 text-[11px] font-black uppercase tracking-[5px] transition-all 
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700 hover:shadow-xl'}`}
        >
          {loading ? 'Processing...' : 'Publish Product to Store'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;