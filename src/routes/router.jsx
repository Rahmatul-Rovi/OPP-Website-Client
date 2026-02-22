import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../components/Coverage';
import About from '../components/About';
import AllCollections from '../pages/AllCollections';
import AddProduct from '../pages/Admin/AddProduct';
import AdminLayout from '../layouts/AdminLayout';
import AdminPos from '../pages/Admin/AdminPos';
import MakeAdmin from '../pages/Admin/MakeAdmin';


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
  element: <AdminLayout />,
  children: [
    {
      path: "/admin/add-product",
      element: <AddProduct></AddProduct>
    },
    {
  path: "pos",
  element: <AdminPos />
},
{
  path: 'make-admin',
  Component: MakeAdmin
}
    // Pore Inventory ba Dashboard page eikhane ashbe
  ]
}
]);

export default router;