import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  // 1. Instant check from localStorage to prevent redirect on refresh
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("user-role") === "admin";
  });
  
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`https://opp-server.vercel.app/users`);
          const currentUser = res.data.find((u) => u.email === user.email);
          
          if (currentUser?.role === "admin") {
            setIsAdmin(true);
            localStorage.setItem("user-role", "admin"); // Double check sync
          } else {
            setIsAdmin(false);
            localStorage.removeItem("user-role");
          }
        } catch (error) {
          console.error("Admin verification failed", error);
        } finally {
          setChecking(false);
        }
      } else if (!loading) {
        setChecking(false);
      }
    };

    checkAdminStatus();
  }, [user, loading]);

  // 2. Loading State Handling
  if (loading || (checking && !isAdmin)) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">Verifying Terminal...</p>
        </div>
      </div>
    );
  }

  // 3. Final Decision
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;