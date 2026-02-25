import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest">Loading Session...</div>;
    
    if (user) return children;

    return <Navigate to="/login" replace />
};

export default PrivateRoute;