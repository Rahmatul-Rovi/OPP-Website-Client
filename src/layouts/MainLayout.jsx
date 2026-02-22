import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {
  return (
    <div>
      {/* Navbar ba Sidebar eikhane tumi nije add kore nio */}
      <Navbar></Navbar>
      <main>
        <Outlet /> 
      </main>

      {/* Footer eikhane add koro */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;