import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../../../components/Hero';
import ProductCard from '../../../components/ProductCard';
import Features from '../../../components/Features';
import Lookbook from '../../../components/Lookbook';
import Gallery from '../../../components/Gallery';
import Testimonials from '../../../components/Testimonials';
import BrandStory from '../../../components/BrandStory';
import Coverage from '../../../components/Coverage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time backend theke data fetch
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Backend connection fail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Hero Section - Main Banner */}
      <Hero />

      {/* 2. Features Section - Trust badges (Quality, Showroom, etc.) */}
      <Features />

      {/* 3. Product Section - Collection Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
            Featured Collection
          </h2>
          <div className="h-1 w-12 bg-black mt-2"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-xs font-bold uppercase tracking-[4px] animate-pulse">Loading Trends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.length > 0 ? (
              products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">No products available in the shop.</p>
            )}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button className="px-10 py-3 border border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
            View All Collection
          </button>
        </div>
      </section>

      {/* 4. Lookbook Section - Category Banners */}
      <Lookbook />

      <Coverage></Coverage>

      {/* 5. Gallery Section - Social Style Feed */}
      <Testimonials></Testimonials>

      {/* BrandStory Section */}
      <BrandStory></BrandStory>
    </div>
  );
}