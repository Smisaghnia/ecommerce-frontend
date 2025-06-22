// pages/Checkout.jsx
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useCartCount();

  // Warenkorb beim Laden einlesen
useEffect(() => {
  const currentCart = getCart();

  // Falls quantity fehlt, standardmäßig auf 1 setzen
  const sanitizedCart = currentCart.map((item) => {
    if (!item.quantity) {
      item.quantity = 1;
    }
    return item;
  });

  console.log("Cart beim Checkout:", sanitizedCart);
  setCart(sanitizedCart);
}, []);

// Gesamtpreis berechnen
const totalPrice = cart.reduce(
  (sum, item) => sum + Number(item.price) * Number(item.quantity),
  0
);

console.log("Total Price:", totalPrice);

  // Formulardaten aktualisieren
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Formular absenden und Bestellung speichern
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validierung bei Kreditkarte
    if (formData.paymentMethod === "creditcard") {
      if (!formData.creditCardNumber || !formData.creditCardExpiry || !formData.creditCardCVC) {
        alert("Bitte fülle alle Kreditkartenfelder aus.");
        return;
      }
    }

    if (cart.length === 0) {
      alert("Dein Warenkorb ist leer.");
      return;
    }

    const orderPayload = {
      name: formData.name,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      creditCardNumber: formData.paymentMethod === "creditcard" ? formData.creditCardNumber : null,
      creditCardExpiry: formData.paymentMethod === "creditcard" ? formData.creditCardExpiry : null,
      creditCardCVC: formData.paymentMethod === "creditcard" ? formData.creditCardCVC : null,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    setLoading(true);

    try {
     const token = localStorage.getItem("token"); // Token aus Login speichern!
console.log("Gespeicherter Token:", token);


const response = await fetch("http://localhost:8081/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // 👈 Token mitsenden!
  },
  body: JSON.stringify(orderPayload),
});

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Fehler bei Bestellung: ${response.status} ${errorText}`);
      }

      const result = await response.json(); // Enthält wahrscheinlich orderId

console.log("Serverantwort:", result); // <-- Hier siehst du z. B. { orderId: 1, message: "Bestellung erfolgreich" }

      // Warenkorb zurücksetzen
      clearCart();
      setCartCount(0);

      // Weiterleitung mit ID
      navigate(`/order-confirmation/${result.id}`, { state: { order: result } });

    } catch (err) {
      console.error(err);
      setError(err.message || "Unbekannter Fehler bei der Bestellung.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 Checkout</h2>

      <form onSubmit={handleSubmit}>
        {/* Kundeninfos */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Adresse:</label><br />
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Zahlungsart:</label><br />
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="paypal">PayPal</option>
            <option value="creditcard">Kreditkarte</option>
          </select>
        </div>

        {/* Kreditkartenfelder nur bei Auswahl */}
        {formData.paymentMethod === "creditcard" && (
          <>
            <div style={{ marginBottom: "1rem" }}>
              <label>Kreditkartennummer:</label><br />
              <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Ablaufdatum:</label><br />
              <input type="text" name="creditCardExpiry" value={formData.creditCardExpiry} placeholder="MM/YY" onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>CVC:</label><br />
              <input type="text" name="creditCardCVC" value={formData.creditCardCVC} onChange={handleChange} required />
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
                {item.name} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} €
              </div>
            ))}
            <p><strong>Gesamt: {totalPrice.toFixed(2)} €</strong></p>
            <button type="submit" style={{ marginTop: "1rem" }} disabled={loading}>
              {loading ? "Bestellung wird verarbeitet..." : "✅ Bestellung abschicken"}
            </button>
          </>
        )}

        {error && <p style={{ color: "red" }}>Fehler: {error}</p>}
      </form>
    </div>
  );
}

export default Checkout;
