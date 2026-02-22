import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';


const AllCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Jokhon server thakbe, eikhan theke data fetch hobe
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Server ekhono connect hoy nai, check backend!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Page Header */}
      <div className="py-12 border-b border-gray-100 text-center">
        <h1 className="text-2xl font-black uppercase tracking-[5px] text-black">All Collection</h1>
        <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest">
          Home / Collections / All Products
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-10">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* 2. Simple Sidebar Filter (Temporary Static) */}
          <div className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b pb-2">Categories</h3>
              <ul className="text-sm text-gray-600 space-y-3 uppercase font-medium tracking-tight">
                <li className="hover:text-black cursor-pointer">New Arrivals</li>
                <li className="hover:text-black cursor-pointer">Formal Shirts</li>
                <li className="hover:text-black cursor-pointer">Casual Wear</li>
                <li className="hover:text-black cursor-pointer">Accessories</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b pb-2">Price Range</h3>
              <ul className="text-sm text-gray-600 space-y-3">
                <li className="hover:text-black cursor-pointer">Under BDT 1500</li>
                <li className="hover:text-black cursor-pointer">BDT 1500 - 3000</li>
                <li className="hover:text-black cursor-pointer">Above BDT 3000</li>
              </ul>
            </div>
          </div>

          {/* 3. Product Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Skeleton Loader placeholder */}
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="animate-pulse bg-gray-50 aspect-[3/4] rounded-sm"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((item) => (
                  <ProductCard key={item._id} product={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  No products found. Stay tuned for our next drop!
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AllCollections;