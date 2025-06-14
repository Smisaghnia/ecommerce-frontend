import React from "react";
import { Link } from "react-router-dom";
import useCartCount from "../hooks/useCartCount";

function Navbar() {
  const cartCount = useCartCount(); // liest direkt aus localStorage und zählt

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart" style={{ marginLeft: "1rem" }}>
        🛒 Warenkorb ({cartCount})
      </Link>
    </nav>
  );
}

export default Navbar;
