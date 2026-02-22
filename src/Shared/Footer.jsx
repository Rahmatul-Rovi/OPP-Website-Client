import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* About Brand */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest">One Point Plus</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Redefining your everyday style with premium quality and minimalist design. Visit our physical store for the full experience.
          </p>
          <div className="flex space-x-4 pt-2">
            <FaFacebookF className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaYoutube className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest">Customer Service</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-black">Shipping & Returns</Link></li>
            <li><Link to="/size-guide" className="hover:text-black">Size Guide</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest">Company</h4>
          <ul className="text-gray-500 text-sm space-y-2">
            <li><Link to="/about" className="hover:text-black">Our Story</Link></li>
            <li><Link to="/coverage" className="hover:text-black">Showroom Locator</Link></li>
            <li><Link to="/admin" className="hover:text-black">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest">Newsletter</h4>
          <p className="text-gray-500 text-xs uppercase tracking-tighter">Sign up for updates</p>
          <div className="flex border-b border-black py-1">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-transparent outline-none text-xs w-full uppercase"
            />
            <button className="text-[10px] font-bold">SUBSCRIBE</button>
          </div>
        </div>

      </div>

      <div className="text-center mt-16 pt-8 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 uppercase tracking-[3px]">
          © {new Date().getFullYear()} One Point Plus - Crafted for Excellence
        </p>
      </div>
    </footer>
  );
};

export default Footer;