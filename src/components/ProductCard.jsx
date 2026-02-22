import React from 'react';

export default function ProductCard({ product }) {
  // Jodi data na thake, error prevent korar jonno loader ba null
  if (!product) return null;

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-50 border border-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Hover-e store info show korbe */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <p className="bg-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest shadow-md">
            Available In Store
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-sm font-bold uppercase tracking-tight text-gray-800">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">BDT {product.price}</p>
      </div>
    </div>
  );
}