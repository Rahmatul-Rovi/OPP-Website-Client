import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh] bg-gray-100 overflow-hidden">
      {/* Background Image - Tumi eikhane real clothing image diba */}
      <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
        alt="New Collection" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">New Arrivals</h1>
        <p className="mt-4 text-sm tracking-[5px] uppercase font-light">Explore the 2026 Collection</p>
        <button className="mt-8 px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;