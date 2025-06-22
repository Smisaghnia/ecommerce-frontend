import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";

function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div>
        <h2>Bestellung nicht gefunden</h2>
        <Link to="/">Zur Startseite</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✅ Vielen Dank für deine Bestellung!</h2>
      <p>Deine Bestellnummer: <strong>{id}</strong></p>
      <p>Name: {order.customerName}</p>
      <p>Adresse: {order.address}</p>
      <p>Zahlungsart: {order.paymentMethod}</p>

      <h3>Bestellte Artikel:</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.productName} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} €
          </li>
        ))}
      </ul>
      <Link to="/">Zur Startseite</Link>
    </div>
  );
}

export default OrderConfirmation;
