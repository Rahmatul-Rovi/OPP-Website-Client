import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;

  const hasDiscount = Number(product.discount) > 0;
  const discountedPrice = hasDiscount 
    ? Math.round(product.price - (product.price * product.discount / 100)) 
    : product.price;

  return (
    <div className="group flex flex-col">
      {/* 1. Image Wrapper */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Link 
            to={`/product/${product._id}`} 
            className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-2xl"
          >
            View Details
          </Link>
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] font-black uppercase tracking-[2px]">
            -{product.discount}%
          </div>
        )}
      </div>
      
      {/* 2. Product Info */}
      <div className="mt-5 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[11px] font-black uppercase tracking-tighter text-black flex-grow">
            {product.title}
          </h3>
          <p className="text-[11px] font-black italic ml-2">
            ৳{discountedPrice}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
           <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">
            {product.category}
          </p>
          {hasDiscount && (
            <span className="text-[9px] text-gray-300 line-through font-bold">৳{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}