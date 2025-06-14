import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart"; 
import Checkout from "./pages/Checkout";

// Seiten
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

// Komponenten
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation immer sichtbar */}
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products/:id" element={<ProductDetail />} />
	  <Route path="/cart" element={<Cart />} />
  	  <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
