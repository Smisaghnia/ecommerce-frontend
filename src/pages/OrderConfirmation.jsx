import React from "react";
import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎉 Vielen Dank für deine Bestellung!</h2>
      <p>Wir haben deine Bestellung erhalten und bearbeiten sie gerade.</p>
      <Link to="/">Zurück zur Startseite</Link>
    </div>
  );
}

export default OrderConfirmation;
