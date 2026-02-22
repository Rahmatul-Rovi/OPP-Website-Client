import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../components/Coverage';
import About from '../components/About';
import AllCollections from '../pages/AllCollections';


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
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'all-collection',
        Component: AllCollections
      }
    ]
  },
  {
    path: "/admin",
    element: <div>Admin POS & Dashboard</div>,
  },
]);

export default router;