import React, { useState, useEffect } from "react";
import { getCart, clearCart } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
 const navigate = useNavigate();

  useEffect(() => {
    const currentCart = getCart();
    console.log("Aktueller Warenkorb:", currentCart);
    setCart(currentCart);
  }, []);

    function handleCheckout() {
    if (cart.length === 0) {
      alert("Dein Warenkorb ist leer!");
      return;
    }
    // Weiterleitung zur Checkout-Seite
    navigate("/checkout");
  }

  // Gesamtpreis berechnen (mit Debug-Log)
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    console.log(`Item: ${item.name}, Preis: ${price}, Menge: ${quantity}`);
    return sum + price * quantity;
  }, 0);

  // Menge erhöhen
  function increaseQuantity(id) {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Menge verringern
  function decreaseQuantity(id) {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // Produkt entfernen
  function removeItem(id) {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  if (cart.length === 0) {
    return <p>🛒 Dein Warenkorb ist leer</p>;
  }

  return (
    <div>
      <h2>🛒 Dein Warenkorb</h2>
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>
          <h3>{item.name}</h3>
          <p>Preis: {item.price.toFixed(2)} €</p>
          <div>
            Menge: 
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span style={{ margin: "0 1rem" }}>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
          <button onClick={() => removeItem(item.id)} style={{ marginTop: "0.5rem" }}>
            Entfernen
          </button>
        </div>
      ))}
      <h3>Gesamt: {totalPrice.toFixed(2)} €</h3>

       <button
        onClick={handleCheckout}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontWeight: "bold" }}
      >
        Zur Kasse
      </button>
    </div>
  );
}

export default Cart;
