import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/usercontext';
import { ProductContextProvider } from './context/productContext';
import { CartContextProvider } from './context/cartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
    <App />
    </CartContextProvider>
    </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
