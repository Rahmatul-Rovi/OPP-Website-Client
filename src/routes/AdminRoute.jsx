import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users`)
        .then((res) => {
          const currentUser = res.data.find(
            (u) => u.email === user.email
          );
          if (currentUser?.role === "admin") {
            setIsAdmin(true);
          }
          setChecking(false);
        })
        .catch(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [user]);

  if (loading || checking) {
    return <div className="text-center mt-20">Checking Access...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;