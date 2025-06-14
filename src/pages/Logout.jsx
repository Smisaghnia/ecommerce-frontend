import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Seite neu laden, um Zustand zurückzusetzen
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

