import React from 'react';

const About = () => {
  return (
    <div className="bg-white pb-20">
      {/* 1. Page Header */}
      <div className="bg-[#F9F9F9] py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-xs font-bold tracking-[6px] uppercase text-gray-400 mb-4">Our Journey</h1>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black italic">
            One Point <span className="text-blue-600 italic">Plus</span>
          </h2>
          <div className="h-1 w-16 bg-black mx-auto mt-6"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 2. Showroom Ambience Image */}
          <div className="relative group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
              alt="Our Showroom" 
              className="w-full h-[500px] object-cover rounded-sm  transition-all duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-white p-4 shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest">Premium Shopping Experience</p>
            </div>
          </div>

          {/* 3. Story Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 leading-tight">
              Redefining Minimalism <br /> In Every Stitch.
            </h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Founded with a vision to provide premium quality attire, <strong>One Point Plus</strong> has quickly become a name synonymous with elegance and comfort. We believe that fashion isn't just about clothes; it's about the confidence you wear.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Our showroom in the heart of Pabna offers a unique shopping experience where every customer is treated with personalized attention. From the finest fabrics to the modern cuts, we ensure that every piece in our collection tells a story of excellence.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-2">Quality First</h4>
                <p className="text-xs text-gray-500 italic">We source only the premium fabrics for a luxurious feel.</p>
              </div>
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-2">Modern Design</h4>
                <p className="text-xs text-gray-500 italic">Merging classic styles with contemporary fashion trends.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Showroom Invitation Section */}
        <div className="mt-24 p-12 bg-black text-white text-center rounded-sm">
          <h3 className="text-2xl font-black uppercase tracking-widest mb-4 italic">Experience It Yourself</h3>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            We invite you to visit our physical outlet at <strong>City Centre, Pabna</strong>. Feel the fabric, try the fits, and find your perfect style in a sophisticated atmosphere.
          </p>
          <div className="flex justify-center items-center gap-10">
            <div className="text-center">
              <p className="text-xl font-bold">100%</p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Authentic Fabric</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-800"></div>
            <div className="text-center">
              <p className="text-xl font-bold">Pabna</p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">Our Flagship Home</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;