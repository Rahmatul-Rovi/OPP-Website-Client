import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiOutlineTrash, HiOutlineEye, HiOutlinePlus, HiOutlineMinus, HiSearch, HiFilter } from 'react-icons/hi';
import Swal from 'sweetalert2';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://opp-server.vercel.app/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Data load error:", error);
      Swal.fire('Error', 'Failed to load products', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category || 'General'))];

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://opp-server.vercel.app/products/${id}`);
        Swal.fire('Deleted!', 'Successfully removed.', 'success');
        fetchProducts();
      } catch (error) {
        Swal.fire('Error', 'Delete failed!', 'error');
      }
    }
  };

  const handleUpdateStock = async (id, newStock) => {
    if (newStock < 0) return;
    try {
      await axios.patch(`https://opp-server.vercel.app/products/${id}`, { stock: Number(newStock) });
      setSelectedProduct(prev => prev ? ({ ...prev, stock: Number(newStock) }) : null);
      fetchProducts();
    } catch (error) {
      console.error("Stock update error:", error);
    }
  };

  const handleApplyChanges = async () => {
    if (!selectedProduct) return;
    
    const finalPrice = Number(newPrice);
    const finalDiscount = Number(discount);

    if (isNaN(finalPrice) || finalPrice <= 0) {
      return Swal.fire('Error', 'Please enter a valid price', 'warning');
    }

    setLoading(true);
    try {
      await axios.patch(`https://opp-server.vercel.app/products/${selectedProduct._id}`, {
        stock: Number(selectedProduct.stock),
        price: finalPrice,
        discount: finalDiscount
      });
      Swal.fire('Updated!', 'Changes applied successfully.', 'success');
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      Swal.fire('Error', 'Update failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen text-black font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Inventory Console</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1 w-10 bg-black"></span>
            <p className="text-[10px] text-gray-500 uppercase tracking-[4px]">System Operations & Logistics</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white border-2 border-black p-4 min-w-[120px]">
            <p className="text-[9px] font-black uppercase text-gray-400">Total Stock</p>
            <p className="text-2xl font-black">{products.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0)}</p>
          </div>
          <div className="bg-black text-white p-4 min-w-[120px]">
            <p className="text-[9px] font-black uppercase text-gray-500">Low Stock</p>
            <p className="text-2xl font-black">{products.filter(p => (p.stock || 0) < 5).length}</p>
          </div>
        </div>
      </div>

      {/* --- CONTROL BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search product name..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 outline-none focus:border-black transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <select 
            className="pl-12 pr-10 py-3 bg-white border border-gray-200 outline-none appearance-none focus:border-black cursor-pointer uppercase text-xs font-bold"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-[10px] font-black uppercase tracking-[2px] text-white">
              <th className="p-5">Product Info</th>
              <th className="p-5">Category</th>
              <th className="p-5">Financials (BDT)</th>
              <th className="p-5">Inventory</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((item) => {
              const mainPrice = Number(item.price) || 0;
              const disc = Number(item.discount) || 0;
              const discountedPrice = mainPrice - (mainPrice * disc / 100);

              return (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-5 flex items-center gap-4">
                    <div className="relative overflow-hidden border p-1 bg-white">
                       <img src={item.image} alt="" className="w-14 h-14 object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase leading-none">{item.title}</p>
                      <p className="text-[9px] text-gray-400 mt-1">ID: {item._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-[10px] font-bold border px-2 py-1 uppercase">{item.category || 'General'}</span>
                  </td>
                  <td className="p-5">
                    {disc > 0 ? (
                      <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-gray-400 line-through">৳{mainPrice.toLocaleString()}</span>
                        <span className="text-sm font-black text-red-600 italic">৳{discountedPrice.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-sm font-black text-black">৳{mainPrice.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${(item.stock || 0) > 5 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-[11px] font-black uppercase">{item.stock || 0} Units</span>
                    </div>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedProduct(item);
                        setNewPrice(item.price || 0);
                        setDiscount(item.discount || 0);
                      }} 
                      className="p-2.5 bg-white border border-black text-black hover:bg-black hover:text-white transition-all"
                    >
                      <HiOutlineEye size={18}/>
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)} 
                      className="p-2.5 bg-white border border-gray-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                    >
                      <HiOutlineTrash size={18}/>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-[2px]">
          <div className="bg-white max-w-xl w-full p-10 relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-t-8 border-black">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 font-light text-3xl hover:rotate-90 transition-transform"
            >✕</button>

            <div className="flex gap-8 mb-10 border-b pb-8">
              <img src={selectedProduct.image} className="w-40 h-48 object-cover border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" alt="" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black bg-black text-white px-2 py-0.5 w-fit mb-2 uppercase tracking-widest">{selectedProduct.category}</span>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-none">{selectedProduct.title}</h3>
                <div className="mt-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Current Market Price</p>
                    <p className="text-3xl font-black">৳{(Number(newPrice) || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 group-focus-within:text-black">Modify Price</label>
                <input 
                  type="number" 
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)} 
                  className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-black font-black text-xl transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Offer Discount (%)</label>
                <input 
                  type="number" 
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-black font-black text-xl transition-colors"
                />
              </div>
            </div>

            <div className="mb-10 bg-gray-50 p-6 border border-dashed border-gray-300">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Stock Inventory Adjustment</label>
              <div className="flex items-center gap-8">
                <button onClick={() => handleUpdateStock(selectedProduct._id, (selectedProduct.stock || 0) - 1)} className="h-12 w-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"><HiOutlineMinus /></button>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-black">{selectedProduct.stock || 0}</span>
                    <span className="text-[8px] font-black uppercase text-gray-400">In Warehouse</span>
                </div>
                <button onClick={() => handleUpdateStock(selectedProduct._id, (selectedProduct.stock || 0) + 1)} className="h-12 w-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"><HiOutlinePlus /></button>
              </div>
            </div>

            <button 
              onClick={handleApplyChanges} 
              disabled={loading} 
              className="w-full bg-black text-white py-5 uppercase font-black tracking-[4px] hover:bg-gray-900 transition-all disabled:bg-gray-400 active:scale-[0.98]"
            >
              {loading ? 'Processing...' : 'Synchronize Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;