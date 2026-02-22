import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-10">
        {/* Eikhane admin er baki page gulo show korbe */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;