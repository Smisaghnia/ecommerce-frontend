import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ WICHTIG!

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ DEFINITION

  const handleLogin = async (e) => {
    e.preventDefault(); // Seite nicht neu laden
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login fehlgeschlagen");
      }

      const data = await response.json();
      console.log("Token erhalten:", data.token);

      // ✅ Token speichern
      localStorage.setItem("token", data.token);
      setToken(data.token);

      // ✅ Weiterleiten nach Login
      navigate("/checkout");

    } catch (err) {
      console.error("Login-Fehler:", err.message);
      setError("Login fehlgeschlagen. Bitte überprüfe deine Daten.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Passwort: </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Einloggen</button>
      </form>

      {token && (
        <p style={{ color: "green" }}>
          ✅ Login erfolgreich! Token gespeichert im localStorage.
        </p>
      )}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
    </div>
  );
}

export default Login;
