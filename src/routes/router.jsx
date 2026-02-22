import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../components/Coverage';


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
          index: true, 
          Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage
      }
    ]
  },
  {
    path: "/admin",
    element: <div>Admin POS & Dashboard</div>,
  },
]);

export default router;