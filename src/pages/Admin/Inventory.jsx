import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineTrash, HiOutlineEye, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import Swal from 'sweetalert2';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0); // Price edit korar jonno state
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Data load error:", error);
      Swal.fire('Error', 'Failed to load products', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Product delete korle ar phire paba na!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        Swal.fire('Deleted!', 'Product removed successfully.', 'success');
        fetchProducts();
      } catch (error) {
        Swal.fire('Error', 'Delete failed!', 'error');
      }
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    if (newStock < 0) return;
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, { stock: Number(newStock) });
      setSelectedProduct(prev => ({ ...prev, stock: Number(newStock) }));
      fetchProducts();
    } catch (error) {
      console.error("Stock update error:", error);
    }
  };

  const handleApplyChanges = async () => {
    if (!selectedProduct) return;
    setLoading(true);

    try {
      // Backend e data pathano
      await axios.patch(`http://localhost:5000/products/${selectedProduct._id}`, {
        stock: Number(selectedProduct.stock),
        price: Number(newPrice), // Edit kora price
        discount: Number(discount)
      });

      Swal.fire('Updated!', 'Product updated successfully.', 'success');
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-end mb-10 border-b pb-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black">Inventory Control</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-[3px]">Manage stock and pricing</p>
        </div>
        <p className="text-xs font-bold uppercase">Total Items: {products.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b">
              <th className="p-4 text-black">Product</th>
              <th className="p-4 text-black">Price (BDT)</th>
              <th className="p-4 text-black">Stock Status</th>
              <th className="p-4 text-right text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const mainPrice = Number(item.price || 0);
              const disc = Number(item.discount || 0);
              const discountedPrice = mainPrice - (mainPrice * disc / 100);

              return (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <img src={item.image} alt="" className="w-12 h-12 object-cover border" />
                    <span className="text-sm font-bold uppercase truncate max-w-[200px]">{item.title}</span>
                  </td>
                  <td className="p-4">
                    {disc > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 line-through">৳{mainPrice.toLocaleString()}</span>
                        <span className="text-sm font-black text-red-600">৳{discountedPrice.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-black">৳{mainPrice.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${item.stock > 5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {item.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedProduct(item);
                        setNewPrice(item.price);
                        setDiscount(item.discount || 0);
                      }} 
                      className="p-2 hover:bg-black hover:text-white border border-black transition rounded-sm"
                    >
                      <HiOutlineEye />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-600 hover:text-white border border-black transition rounded-sm">
                      <HiOutlineTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 font-bold text-xl">✕</button>

            <div className="flex gap-6 mb-8 border-b pb-6">
              <img src={selectedProduct.image} className="w-32 h-40 object-cover border-2 border-black p-1" alt="" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{selectedProduct.title}</h3>
                <p className="text-2xl mt-2 font-bold">৳{newPrice.toLocaleString()}</p>
                {discount > 0 && <p className="text-xs text-red-600 font-bold">-{discount}% OFF</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* PRICE EDIT */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Edit Price</label>
                <input 
                  type="number" 
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-black font-bold"
                />
              </div>

              {/* DISCOUNT EDIT */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Discount (%)</label>
                <input 
                  type="number" 
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                  className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-black font-bold"
                />
              </div>
            </div>

            {/* STOCK CONTROL */}
            <div className="mb-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Update Stock</label>
              <div className="flex items-center gap-6">
                <button onClick={() => handleUpdateStock(selectedProduct._id, selectedProduct.stock - 1)} className="p-3 border border-black hover:bg-black hover:text-white transition"><HiOutlineMinus /></button>
                <span className="text-xl font-black w-10 text-center">{selectedProduct.stock}</span>
                <button onClick={() => handleUpdateStock(selectedProduct._id, selectedProduct.stock + 1)} className="p-3 border border-black hover:bg-black hover:text-white transition"><HiOutlinePlus /></button>
              </div>
            </div>

            <button onClick={handleApplyChanges} disabled={loading} className="w-full bg-black text-white py-4 uppercase font-black tracking-widest hover:bg-gray-800 transition disabled:bg-gray-400 shadow-lg">
              {loading ? 'Updating...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;