import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://opp-server.vercel.app/users/admin/${user.email}`)
        .then((res) => {
          setIsAdmin(res.data.admin);
        })
        .catch((err) => console.error("Admin check failed", err));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-black border-b-2 border-black pb-1 transition-all"
      : "text-gray-500 hover:text-black transition-all";

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="bg-black text-white text-[9px] py-1 text-center uppercase tracking-[3px] font-bold">
        One Point Plus • Official Terminal
      </div>

      <div className="container mx-auto px-4 lg:px-10 py-3 flex justify-between items-center">
        {/* Left: Brand Logo */}
     <div className="flex-shrink-0 -mt-2"> {/* Puratuku upore uthanor jonno */}
  <button
    onClick={handleLogoClick}
    className="text-2xl lg:text-3xl font-black tracking-tighter text-red-600 uppercase flex items-center"
  >
    One Point
    <span className="text-red-600 text-6xl lg:text-5xl ml-1 mb-3 inline-block">
      +
    </span>
  </button>
</div>

        <div className="hidden lg:block">
          <ul className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-[2px]">
            <li>
              <NavLink to="/" className={navLinkStyles}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-collection" className={navLinkStyles}>
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyles}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/coverage" className={navLinkStyles}>
                Support
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center space-x-5">
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-slate-200 group"
                  title="Admin Dashboard"
                >
                  <HiOutlineViewGrid className="text-lg" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Dashboard
                  </span>
                </Link>
              )}

              {/* User Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 group border-l pl-4 border-gray-200"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-slate-900 leading-none">
                    {user.displayName?.split(" ")[0] || "User"}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-black transition-all">
                  <HiOutlineUser className="text-lg text-slate-600" />
                </div>
              </Link>

              <button
                onClick={logOut}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <HiOutlineLogout className="text-xl" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[10px] font-black uppercase tracking-widest border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer group p-1">
            <HiOutlineShoppingBag className="text-2xl text-slate-800" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
