import React from 'react';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineClock } from 'react-icons/hi';

const Coverage = () => {
  // Pabna Aurangzeb Road exact location map link
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.402360405232!2d89.2352077759039!3d24.008064478330052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb9b2f5708948f%3A0xe38c7c1d30af4550!2sAurangzeb%20Rd%2C%20Pabna!5e0!3m2!1sen!2sbd!4v1708680000000!5m2!1sen!2sbd";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[5px] uppercase text-gray-400 mb-3 text-center">Store Location</h2>
          <p className="text-3xl font-black uppercase tracking-tighter text-center">Find Our Showroom</p>
          <div className="h-1 w-12 bg-black mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row border border-gray-100 shadow-2xl rounded-sm overflow-hidden">
          
          {/* Left Side: Showroom Details */}
          <div className="lg:w-1/3 bg-black text-white p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Pabna Outlet</h3>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <HiOutlineLocationMarker className="text-2xl text-gray-400 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Location</h4>
                  <p className="text-sm leading-relaxed">
                    City Centre, Ground Floor<br />
                    Aurangzeb Road, Pabna
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <HiOutlinePhone className="text-2xl text-gray-400 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Contact</h4>
                  <p className="text-sm font-bold">01719456261</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <HiOutlineClock className="text-2xl text-gray-400 shrink-0" />
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Open Hours</h4>
                  <p className="text-sm">Sat - Thu: 10:00 AM - 09:00 PM</p>
                  <p className="text-xs text-gray-500 mt-1 italic font-medium">Friday: Closed</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.open("https://maps.app.goo.gl/uX38UuYf8f8u8u8u8", "_blank")}
              className="mt-12 w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              Get Directions
            </button>
          </div>

          {/* Right Side: Interactive Google Map */}
          <div className="lg:w-2/3 h-[450px] lg:h-auto min-h-[400px]">
            <iframe 
              title="One Point Plus Pabna Showroom"
              src={mapUrl}
              className="w-full h-full  transition-all duration-700"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Coverage;