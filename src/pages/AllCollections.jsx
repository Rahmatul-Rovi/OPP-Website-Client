import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Search, ShoppingBag, SlidersHorizontal, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const AllCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('https://opp-server.vercel.app/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Backend connection error!");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // 🟢 Filter Logic: Search ar Category  handle together
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, products]);

  // Unique categories list generate 
  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Minimal Header */}
      <div className="pt-20 pb-12 px-6 lg:px-12 border-b border-gray-50">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[3px] mb-4 font-bold">
              <span>Home</span> <ChevronRight size={10} /> <span>Collections</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">
              The Drop
            </h1>
            <p className="text-gray-400 text-[10px] mt-3 uppercase tracking-[4px] font-bold">
              {filteredProducts.length} Pieces Available
            </p>
          </div>

          {/* 🟢 Action Bar: Search & Category */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text"
                placeholder="FIND YOUR VIBE..."
                className="pl-12 pr-6 py-4 bg-gray-50 border-none text-[10px] font-bold tracking-widest focus:ring-1 focus:ring-black w-full sm:w-72 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative flex items-center bg-gray-50 px-4">
               <SlidersHorizontal size={14} className="text-gray-400 mr-2" />
               <select 
                  className="bg-transparent border-none text-[10px] font-bold tracking-widest py-4 focus:ring-0 uppercase cursor-pointer"
                  onChange={(e) => setActiveCategory(e.target.value)}
               >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === "All" ? "ALL ARCHIVE" : cat}</option>
                  ))}
               </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12">
        {loading ? (
          /* 🟢 Skeleton Loader */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="space-y-4 animate-pulse">
                <div className="bg-gray-100 aspect-[3/4]"></div>
                <div className="h-3 bg-gray-100 w-3/4"></div>
                <div className="h-3 bg-gray-100 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          /* 🟢 Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        ) : (
          /* 🟢 No Results */
          <div className="py-40 text-center">
            <h2 className="text-gray-200 text-3xl font-black uppercase tracking-[1em]">Empty Drop</h2>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("All")}}
              className="mt-6 text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCollections;