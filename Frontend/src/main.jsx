import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import { AppProvider } from "./Context/AppContext";
import { SearchProvider } from "./Context/SearchContext";
import { WishlistProvider } from "./Context/wishlistContext";
import { CartProvider } from "./Context/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartProvider>
    <WishlistProvider> 
      <AppProvider>
        <SearchProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </AppProvider>
    </WishlistProvider>
  </CartProvider>
  </StrictMode>
);

