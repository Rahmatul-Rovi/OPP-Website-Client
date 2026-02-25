import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineSearch, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { AuthContext } from '../Providers/AuthProviders';
import axios from 'axios';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if the logged-in user is an Admin
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/admin/${user.email}`)
        .then(res => {
          setIsAdmin(res.data.admin);
        })
        .catch(err => console.error("Admin check failed", err));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      {/* Top Thin Bar */}
      <div className="bg-black text-white text-[10px] py-1.5 text-center uppercase tracking-widest font-bold">
        Welcome to One Point Plus
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
        
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center">
          <button 
            onClick={handleLogoClick}
            className="text-xl lg:text-2xl font-black tracking-tighter text-black uppercase text-left"
          >
            One Point <span className="text-gray-400">Plus</span>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 hidden md:flex justify-center items-center">
           <div className="relative w-full max-w-[300px]">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input 
                type="text" 
                placeholder="SEARCH COLLECTION..." 
                className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-[10px] font-bold focus:ring-1 focus:ring-black outline-none transition-all"
              />
           </div>
        </div>

        {/* Right: User Icons & Profile */}
        <div className="flex-1 flex justify-end items-center space-x-6">
          
          {user ? (
            <div className="flex items-center gap-5">
               {/* ✅ Dashboard Link: Only for Admin */}
               {isAdmin && (
                 <Link to="/admin" className="flex items-center gap-1 text-slate-900 hover:text-blue-600 transition-colors">
                    <HiOutlineViewGrid className="text-2xl" />
                    <span className="text-[10px] font-black uppercase hidden sm:block tracking-widest">Dashboard</span>
                 </Link>
               )}

               {/* User Info & Profile */}
               <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Access Granted</p>
                    <p className="text-[10px] font-bold text-slate-900 truncate max-w-[80px]">{user.displayName || 'User'}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-black transition-all">
                    <HiOutlineUser className="text-lg text-slate-600" />
                  </div>
               </Link>
               
               {/* Logout Button */}
               <button 
                onClick={logOut}
                className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
               >
                  <HiOutlineLogout className="text-xl" />
               </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-gray-500 transition-colors">
              <HiOutlineUser className="text-2xl" />
              <span className="text-[10px] font-black uppercase hidden sm:block tracking-widest">Login</span>
            </Link>
          )}

          {/* Cart Icon */}
          <div className="relative cursor-pointer group">
            <HiOutlineShoppingBag className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="pb-5">
        <ul className="flex justify-center space-x-10 text-[11px] font-black uppercase tracking-[2px] text-gray-800">
          <li><NavLink to="/" className={({isActive}) => isActive ? "text-black border-b-2 border-black pb-1" : "hover:text-gray-400 transition-colors"}>Home</NavLink></li>
          <li><NavLink to="/all-collection" className={({isActive}) => isActive ? "text-black border-b-2 border-black pb-1" : "hover:text-gray-400 transition-colors"}>All Collection</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? "text-black border-b-2 border-black pb-1" : "hover:text-gray-400 transition-colors"}>About Us</NavLink></li>
          <li><NavLink to="/coverage" className={({isActive}) => isActive ? "text-black border-b-2 border-black pb-1" : "hover:text-gray-400 transition-colors"}>Coverage</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;