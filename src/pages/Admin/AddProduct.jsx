import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    image: '',
    category: 'General',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Price & Stock always number
    if (name === "price" || name === "stock") {
      setFormData({
        ...formData,
        [name]: value === "" ? "" : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 VALIDATION
    if (!formData.title || !formData.image) {
      Swal.fire('Error', 'Title & Image required!', 'error');
      return;
    }

    if (formData.price === "" || formData.price <= 0) {
      Swal.fire('Error', 'Price must be greater than 0', 'error');
      return;
    }

    if (formData.stock === "" || formData.stock < 0) {
      Swal.fire('Error', 'Stock cannot be negative', 'error');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      console.log("Sending Data:", productData); // 🔍 Debug

      const response = await axios.post(
        'http://localhost:5000/products',
        productData
      );

      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully!',
          icon: 'success',
          confirmButtonColor: '#000'
        });

        // Reset form
        setFormData({
          title: '',
          price: '',
          stock: '',
          image: '',
          category: 'General',
          description: ''
        });
      }

    } catch (error) {
      console.error("Backend error:", error);
      Swal.fire('Error', 'Server error!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl border border-gray-50 mt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">
          Add New Product
        </h2>
        <div className="h-1 w-20 bg-black mx-auto mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">

        {/* Title */}
        <div className="col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 block mb-2">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            placeholder='Product Name'
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black text-sm font-bold"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 block mb-2">
            Price (BDT)
          </label>
          <input
            type="number"
            name="price"
            placeholder='Product Price'
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black text-sm font-bold"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 block mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            placeholder='product Quantity'
            required
            value={formData.stock}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-100 py-3 outline-none focus:border-black text-sm font-bold"
          />
        </div>

        {/* Image */}
        <div className="col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 block mb-2">
            Image URL
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image link..."
              className="flex-grow border-b-2 border-gray-100 py-3 outline-none focus:border-black text-sm italic"
            />

            {formData.image && (
              <div className="h-16 w-16 border-2 border-black p-1 overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className={`col-span-2 mt-8 py-5 text-[11px] font-black uppercase tracking-[5px] transition-all 
          ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-700 hover:shadow-xl'
            }`}
        >
          {loading ? 'Processing...' : 'Publish Product'}
        </button>

      </form>
    </div>
  );
};

export default AddProduct;