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
import Inventory from '../pages/Admin/Inventory';
import ProductDetails from '../pages/ProductDetails';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Login from '../pages/Login';
import AdminRoute from './AdminRoute';
import Profile from '../pages/Profile';


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
      },
      {
        path: "product/:id",
        Component: ProductDetails
      },
      {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "profile",
    Component: Profile
  }
    ]
  },
 {
  path: "/admin",
  element: (
   <AdminRoute>
     <AdminLayout />
   </AdminRoute>
  ),
  children: [
    {
      index: true,
      element: <AdminDashboard />
    },
    {
      path: "add-product",
      element: <AddProduct />
    },
    {
      path: "pos",
      element: <AdminPos />
    },
    {
      path: "make-admin",
      element: <MakeAdmin />
    },
    {
      path: "manage-products",
      element: <Inventory />
    }
  ]
}
]);

export default router;