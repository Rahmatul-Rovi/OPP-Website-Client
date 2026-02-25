import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineViewGrid, 
  HiOutlinePlusCircle, 
  HiOutlineShoppingCart, 
  HiOutlineCalculator, 
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineShieldCheck
} from 'react-icons/hi';

const Sidebar = () => {
  const activeLink = "flex items-center gap-3 text-sm font-bold uppercase tracking-widest bg-white text-black p-3 rounded-sm transition-all duration-300 shadow-lg";
  const normalLink = "flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white p-3 transition-all duration-300 border-l-2 border-transparent hover:border-blue-500";

  return (
    <div className="w-72 bg-black h-screen sticky top-0 text-white p-6 border-r border-gray-800 z-50">
      {/* Brand Logo Section */}
      <div className="mb-12 pt-4">
        <h2 className="text-xl font-black uppercase tracking-tighter italic leading-none">
          ONE POINT <span className="text-blue-500 underline decoration-2 underline-offset-4">PLUS</span>
        </h2>
        <p className="text-[10px] text-gray-500 uppercase tracking-[4px] mt-2 font-bold">Admin Panel</p>
      </div>
      
      {/* Navigation Links */}
      <nav className="space-y-3">
        {/* Dashboard */}
        <NavLink 
          to="/admin" 
          end 
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
          
        {/* Make Admin - Added Shield Icon for clarity */}
        <NavLink 
          to="/admin/make-admin" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineShieldCheck className="text-xl" /> Make Admin
        </NavLink>

        {/* Inventory / Manage Products */}
        <NavLink 
          to="/admin/manage-products" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineShoppingCart className="text-xl" /> Inventory
        </NavLink>

         <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          <HiOutlineHome className="text-xl" /> Back to Home
        </NavLink>
      </nav>

    
    </div>
  );
};

export default Sidebar;