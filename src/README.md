# 🛍️ E-Commerce Frontend (React)

Dies ist das React-Frontend für das E-Commerce-Projekt.

## 🔧 Technologien

- React (mit Vite)
- Axios
- React Router
- Zustand oder Redux (optional)
- Tailwind CSS (falls genutzt)
- JWT-Authentifizierung (Token wird gespeichert im LocalStorage)

## 🚀 Starten

```bash
npm install
npm run dev

⚙️ Backend verbinden
Das Frontend ist auf das Backend ausgelegt, das unter z. B. http://localhost:8081 läuft.

In .env:

env
Kopieren
Bearbeiten
VITE_API_BASE_URL=http://localhost:8081/api
🔐 Authentifizierung
Login mit POST /api/auth/login

Token wird im LocalStorage gespeichert und bei API-Requests verwendet

📦 Features
Login-Seite

Produktübersicht mit Kategorie-Filter

Produkt-Detailseite

Warenkorb (mit Menge ändern & entfernen)

Bestellen

User-Profilseite

🛠 Aufbau
src/
├── api/           // Axios-Instanzen & API-Funktionen
├── components/    // Wiederverwendbare UI-Komponenten
├── pages/         // Hauptseiten: Home, Product, Cart, Login, etc.
├── hooks/         // Custom React Hooks
├── context/       // AuthContext, CartContext etc. (oder Zustand/Redux)
└── App.jsx        // Hauptkomponente mit Routing
