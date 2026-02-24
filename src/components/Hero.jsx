import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
        alt="New Collection" 
        className="w-full h-full object-cover"
      />
      
      {/* Overlay with Left Alignment (No colors, only Black & White) */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start text-white px-10 md:px-24">
        
        <p className="mb-4 text-xs md:text-sm tracking-[5px] uppercase font-light">
          Explore the 2026 Collection
        </p>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9]">
          New <br /> 
          Arrivals
        </h1>

        <div className="mt-10">
        <Link to="all-collection">
         <button className="px-12 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[3px] hover:bg-black hover:text-white border border-white transition-all duration-500 shadow-2xl">
            Shop Now
          </button>
        </Link> 
        </div>

      </div>
      
      {/* Optional: Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default Hero;