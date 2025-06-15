import React, { useState, useEffect } from "react";
import { getCart, clearCart } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";
import useCartCount from "../hooks/useCartCount";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "paypal",
    creditCardNumber: "",
    creditCardExpiry: "",
    creditCardCVC: "",
  });

  const navigate = useNavigate();
  const [cartCount, setCartCount] = useCartCount(); // Hook zur Navbar-Zähler-Verwaltung

  useEffect(() => {
    const currentCart = getCart();
    setCart(currentCart);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "creditcard") {
      if (
        !formData.creditCardNumber ||
        !formData.creditCardExpiry ||
        !formData.creditCardCVC
      ) {
        alert("Bitte fülle alle Kreditkartenfelder aus.");
        return;
      }
    }

    console.log("✅ Bestellung gesendet:", {
      ...formData,
      cart,
    });

    clearCart();       // Warenkorb im localStorage leeren
    setCartCount(0);   // Navbar-Zähler auf 0 setzen
    navigate("/order-confirmation"); // Weiterleitung zur Bestätigungsseite
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Adresse:</label><br />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Zahlungsart:</label><br />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="paypal">PayPal</option>
            <option value="creditcard">Kreditkarte</option>
          </select>
        </div>

        {formData.paymentMethod === "creditcard" && (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label>Kreditkartennummer:</label><br />
              <input
                type="text"
                name="creditCardNumber"
                value={formData.creditCardNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Ablaufdatum:</label><br />
              <input
                type="text"
                name="creditCardExpiry"
                placeholder="MM/YY"
                value={formData.creditCardExpiry}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>CVC:</label><br />
              <input
                type="text"
                name="creditCardCVC"
                value={formData.creditCardCVC}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <hr />

        <h3>🛍️ Bestellübersicht</h3>
        {cart.length === 0 ? (
          <p>Dein Warenkorb ist leer.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id}>
                {item.name} × {item.quantity} ={" "}
                {(item.price * item.quantity).toFixed(2)} €
              </div>
            ))}
            <p><strong>Gesamt: {totalPrice.toFixed(2)} €</strong></p>
            <button type="submit" style={{ marginTop: "1rem" }}>
              ✅ Bestellung abschicken
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Checkout;
