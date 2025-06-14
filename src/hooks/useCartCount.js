import { useState, useEffect } from "react";
import { getCartItemCount } from "../utils/cartUtils";

export default function useCartCount() {
  const [count, setCount] = useState(getCartItemCount());

  useEffect(() => {
    const update = () => setCount(getCartItemCount());

    window.addEventListener("storage", update);

    // Auch bei erster Ladung einmal holen
    update();

    return () => window.removeEventListener("storage", update);
  }, []);

  return count;
}
