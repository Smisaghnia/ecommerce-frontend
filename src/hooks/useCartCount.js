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

    window.addEventListener("storage", onStorageChange);
    window.addEventListener("cartUpdated", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("cartUpdated", onStorageChange);
    };
  }, []);

  return [count, setCount];
}

