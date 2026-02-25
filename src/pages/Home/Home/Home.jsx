import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Hero from '../../../components/Hero';
import ProductCard from '../../../components/ProductCard';
import Features from '../../../components/Features';
import Lookbook from '../../../components/Lookbook';
import Coverage from '../../../components/Coverage';
import About from '../../../components/About';
import Testimonials from '../../../components/Testimonials';
import BrandStory from '../../../components/BrandStory';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
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
    <div className="bg-white overflow-x-hidden">
      <div data-aos="fade-down"><Hero /></div>
      <div data-aos="fade-up" data-aos-delay="200"><Features /></div>

      {/* 🟢 3. Product Section - Optimized for 8 items */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-12" data-aos="zoom-in">
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.slice(0, 8).map((item, index) => (
                <div 
                  key={item._id} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 100}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>

            {/* "View All" Button Section */}
            {products.length > 8 && (
              <div className="mt-16 flex justify-center" data-aos="fade-up">
                <Link 
                  to="/all-collection" 
                  className="group relative px-12 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-zinc-800 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View All Collections
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      <div data-aos="fade-right"><Lookbook /></div>
      <div data-aos="fade-left"><Coverage /></div>
      <div data-aos="zoom-in-up"><Testimonials /></div>
      <div data-aos="fade-up"><About /></div>
      <div data-aos="flip-up"><BrandStory /></div>
    </div>
  );
}