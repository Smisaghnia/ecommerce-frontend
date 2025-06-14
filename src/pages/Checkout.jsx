import React, { useState } from "react";

function Checkout() {
  // Formularzustände
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Formular absenden
  function handleSubmit(e) {
    e.preventDefault();

    // Einfaches Validieren (kannst du noch verbessern)
    if (!name || !email || !address || !cardNumber || !expiryDate || !cvv) {
      alert("Bitte fülle alle Felder aus.");
      return;
    }

    // Hier würdest du z.B. eine API für die Bestellung aufrufen

    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div>
        <h2>Vielen Dank für deine Bestellung!</h2>
        <p>Wir bearbeiten deine Bestellung und schicken dir eine Bestätigung per E-Mail.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <h3>Lieferadresse</h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          E-Mail:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Adresse:
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </label>

        <h3>Zahlungsinformationen</h3>
        <label>
          Kreditkartennummer:
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
            maxLength={16}
            pattern="\d{16}"
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <br />
        <label>
          Ablaufdatum (MM/YY):
          <input
            type="text"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            required
            maxLength={5}
            pattern="\d{2}/\d{2}"
            placeholder="MM/YY"
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            required
            maxLength={3}
            pattern="\d{3}"
            placeholder="123"
          />
        </label>
        <br />

        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Bestellung abschicken
        </button>
      </form>
    </div>
  );
}

export default Checkout;
