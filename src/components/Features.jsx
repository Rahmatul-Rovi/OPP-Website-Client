import React from 'react';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineLocationMarker } from 'react-icons/hi';

const Features = () => {
  const data = [
    { icon: <HiOutlineLocationMarker />, title: "Try at Showroom", desc: "Visit us at Dhanmondi to try before you buy." },
    { icon: <HiOutlineShieldCheck />, title: "Premium Quality", desc: "We use the finest fabrics for your comfort." },
    { icon: <HiOutlineTruck />, title: "Fast Delivery", desc: "Get your product within 24 hours in Dhaka." }
  ];

  return (
    <section className="bg-gray-50 py-16 border-y border-gray-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-3">
            <div className="text-4xl text-black">{item.icon}</div>
            <h4 className="text-sm font-bold uppercase tracking-widest">{item.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;