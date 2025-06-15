import React, { useEffect, useState } from "react";
import { getCart, updateQuantity, removeFromCart } from "../utils/cartUtils";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleQuantityChange = (id, newQty) => {
    updateQuantity(id, newQty);
    setCart(getCart());
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <p>Dein Warenkorb ist leer.</p>;

  return (
    <div>
      <h2>Warenkorb</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
          <img src={`/images/products/${item.imageFile}`} alt={item.name} style={{ width: "100px" }} />
          <h3>{item.name}</h3>
          <p>Preis: {item.price.toFixed(2)} €</p>
          <label>
            Menge:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
              style={{ width: "50px", marginLeft: "0.5rem" }}
            />
          </label>
          <button onClick={() => handleRemove(item.id)} style={{ marginLeft: "1rem" }}>
            Entfernen
          </button>
          <p>Gesamt: {(item.price * item.quantity).toFixed(2)} €</p>
        </div>
      ))}
      <h3>Gesamtpreis: {totalPrice.toFixed(2)} €</h3>
    </div>
  );
}

export default Cart;
