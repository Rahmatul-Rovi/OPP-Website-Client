import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/router'

import {RouterProvider } from "react-router";
import { CartProvider } from './context/CartContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <CartProvider>
   <RouterProvider router={router} />
 </CartProvider>
  </StrictMode>
)