import React from 'react';

const Lookbook = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Card */}
        <div className="relative group overflow-hidden h-[500px] cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Men"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10">
            <h3 className="text-white text-3xl font-black uppercase italic">The Gentleman's Edit</h3>
            <button className="text-white text-xs font-bold uppercase border-b border-white w-max mt-4 pb-1 hover:text-gray-300">Explore Collection</button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative group overflow-hidden h-[500px] cursor-pointer">
          <img 
           src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Women"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10">
            <h3 className="text-white text-3xl font-black uppercase italic">Urban Chic Style</h3>
            <button className="text-white text-xs font-bold uppercase border-b border-white w-max mt-4 pb-1 hover:text-gray-300">Shop The Look</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;