import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineSearch } from 'react-icons/hi';

const Navbar = () => {
  // Logic for logged in user
  const user = {
    isLoggedIn: false,
    photoURL: null
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Top Thin Bar (Optional, for announcements) */}
      <div className="bg-black text-white text-[10px] py-1.5 text-center uppercase tracking-widest">
        Free shipping on orders over 5000 BDT
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
        
        {/* Left: Search Icon (Gentle Park style) */}
        <div className="flex-1 hidden md:flex items-center space-x-4">
          <HiOutlineSearch className="text-xl cursor-pointer hover:text-gray-500" />
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 text-center">
          <Link to="/" className="text-2xl lg:text-3xl font-black tracking-tighter text-black uppercase">
            One Point <span className="text-gray-400">Plus</span>
          </Link>
        </div>

        {/* Right: User Icons */}
        <div className="flex-1 flex justify-end items-center space-x-5">
          {user.isLoggedIn ? (
            <Link to="/profile">
              <img 
                src={user.photoURL || 'https://via.placeholder.com/32'} 
                className="w-8 h-8 rounded-full border border-gray-200" 
                alt="profile" 
              />
            </Link>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-gray-500">
              <HiOutlineUser className="text-2xl" />
              <span className="text-xs font-semibold uppercase hidden sm:block">Login</span>
            </Link>
          )}
          <div className="relative cursor-pointer">
            <HiOutlineShoppingBag className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Bottom Center */}
      <div className="pb-4">
        <ul className="flex justify-center space-x-8 text-[13px] font-bold uppercase tracking-widest text-gray-800">
          <li><NavLink to="/" className={({isActive}) => isActive ? "text-black border-b border-black" : "hover:text-gray-500"}>Home</NavLink></li>
          <li><NavLink to="/all-collection" className={({isActive}) => isActive ? "text-black border-b border-black" : "hover:text-gray-500"}>All Collection</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? "text-black border-b border-black" : "hover:text-gray-500"}>About Us</NavLink></li>
          <li><NavLink to="/coverage" className={({isActive}) => isActive ? "text-black border-b border-black" : "hover:text-gray-500"}>Coverage</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;