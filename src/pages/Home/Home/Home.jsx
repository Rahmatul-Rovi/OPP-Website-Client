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
import About from '../../../components/About';
import AllCollections from '../../AllCollections';
import AOS from 'aos'; // 🟢 1. Import AOS
import 'aos/dist/aos.css'; // 🟢 2. Import CSS

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🟢 3. AOS Initialize
    AOS.init({
      duration: 1000, // Animation speed (1 second)
      once: false,    // Scroll up-down korle bar bar hobe (true dile shudhu 1 bar)
      mirror: true,
    });

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products'); // API path check koro
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
    <div className="bg-white overflow-x-hidden"> {/* Horizontal scroll avoid korte */}
      
      {/* 1. Hero - Fade Down */}
      <div data-aos="fade-down">
        <Hero />
      </div>

      {/* 2. Features - Fade Up */}
      <div data-aos="fade-up" data-aos-delay="200">
        <Features />
      </div>

      {/* 3. Product Section */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((item, index) => (
              <div 
                key={item._id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100} // Ekta ekta kore smooth ashar jonne
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Lookbook - Slide Left/Right */}
      <div data-aos="fade-right">
        <Lookbook />
      </div>

      <div data-aos="fade-left">
        <Coverage />
      </div>

      {/* Baki section gulo */}
      <div data-aos="zoom-in-up">
        <Testimonials />
      </div>
      
      <div data-aos="fade-up">
        <About />
      </div>

      <div data-aos="flip-up">
        <BrandStory />
      </div>
    </div>
  );
}
