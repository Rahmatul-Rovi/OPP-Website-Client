import React from 'react';

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400",
    "https://images.unsplash.com/photo-1479064566235-aa6742f5a801?w=400",
    "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=400"
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-xs font-bold tracking-[5px] uppercase text-gray-400">#OnePointPlus</h2>
        <p className="text-lg font-medium mt-2">Follow our journey on Instagram</p>
      </div>
      <div className="flex space-x-2 animate-scroll">
         {/* Mapping images twice for infinite scroll effect or just static grid */}
         <div className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full px-2">
            {images.map((img, i) => (
              <img key={i} src={img} className="w-full h-64 object-cover hover:brightness-75 transition" />
            ))}
         </div>
      </div>
    </section>
  );
};

export default Gallery;