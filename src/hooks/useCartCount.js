import { useState, useEffect } from "react";

function getCartFromLocalStorage() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function calculateCount(cart) {
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

export default function useCartCount() {
  const [count, setCount] = useState(() => calculateCount(getCartFromLocalStorage()));

  useEffect(() => {
    function onStorageChange() {
      const cart = getCartFromLocalStorage();
      setCount(calculateCount(cart));
    }

    // Event für Tab-Wechsel
    window.addEventListener("storage", onStorageChange);

    // Optional: eigenes Custom-Event für intra-App Änderungen
    window.addEventListener("cartUpdated", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("cartUpdated", onStorageChange);
    };
  }, []);

  return count;
}
