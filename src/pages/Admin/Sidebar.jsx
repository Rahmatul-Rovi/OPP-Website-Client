import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineViewGrid, 
  HiOutlinePlusCircle, 
  HiOutlineShoppingCart, 
  HiOutlineCalculator, 
  HiOutlineLogout 
} from 'react-icons/hi';

const Sidebar = () => {
  // Active thakle eyi style-ta apply hobe
  const activeLink = "flex items-center gap-3 text-sm font-bold uppercase tracking-widest bg-white text-black p-3 rounded-sm transition-all duration-300 shadow-lg";
  const normalLink = "flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white p-3 transition-all duration-300";

  return (
    <div className="w-72 bg-black h-screen sticky top-0 text-white p-6 border-r border-gray-800">
      <div className="mb-12 pt-4">
        <h2 className="text-xl font-black uppercase tracking-tighter italic">
          ONE POINT <span className="text-blue-500 underline decoration-2 underline-offset-4">PLUS</span>
        </h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-[4px] mt-1">Admin Panel</p>
      </div>
      
      <nav className="space-y-3">
        {/* Dashboard */}
        <NavLink 
          to="/admin" 
          end // Jate shudu base /admin e active hoy
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineViewGrid className="text-xl" /> Dashboard
        </NavLink>

        {/* Admin POS */}
        <NavLink 
          to="/admin/pos" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineCalculator className="text-xl" /> Admin POS
        </NavLink>

        {/* Add Product */}
        <NavLink 
          to="/admin/add-product" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlinePlusCircle className="text-xl" /> Add Product
        </NavLink>

        {/* Inventory */}
        <NavLink 
          to="/admin/manage-products" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineShoppingCart className="text-xl" /> Inventory
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-10 left-0 w-full px-6">
        <button className="flex items-center justify-center gap-3 w-full py-3 border border-red-900/30 text-xs font-bold uppercase text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm">
          <HiOutlineLogout className="text-lg" /> Logout System
        </button>
      </div>
    </div>
  );
};

export default Sidebar;