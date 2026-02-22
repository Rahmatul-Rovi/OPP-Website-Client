import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-[3px] text-black">One Point Plus</h4>
          <p className="text-gray-500 text-[13px] leading-relaxed">
            Redefining your everyday style with premium quality and minimalist design. 
            Crafted for those who value excellence.
          </p>
          <div className="flex space-x-5 pt-2">
            <FaFacebookF className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
            <FaInstagram className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
            <FaYoutube className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
          </div>
        </div>

        {/* Store Location - Pabna Address */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-[3px] text-black">Visit Our Store</h4>
          <div className="text-gray-500 text-[13px] space-y-2 leading-relaxed">
            <p className="font-medium text-black">Pabna Showroom</p>
            <p>City Centre, Ground Floor</p>
            <p>Aurangzeb Road, Pabna</p>
            <p className="pt-2 text-black font-semibold">Phone: 01719456261</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-[3px] text-black">Company</h4>
          <ul className="text-gray-500 text-[13px] space-y-2">
            <li><Link to="/all-collection" className="hover:text-black transition-colors">All Collection</Link></li>
            <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
            <li><Link to="/coverage" className="hover:text-black transition-colors">Showroom Locator</Link></li>
            <li><Link to="/admin" className="hover:text-black transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-[3px] text-black">Newsletter</h4>
          <p className="text-gray-500 text-[11px] uppercase tracking-widest">Sign up for exclusive updates</p>
          <div className="flex border-b border-black py-2 mt-2">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-transparent outline-none text-[11px] w-full uppercase placeholder:text-gray-300"
            />
            <button className="text-[10px] font-black hover:text-gray-500 transition-colors">JOIN</button>
          </div>
        </div>

      </div>

      <div className="text-center mt-20 pt-8 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 uppercase tracking-[4px]">
          © {new Date().getFullYear()} One Point Plus - Crafted for Excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;