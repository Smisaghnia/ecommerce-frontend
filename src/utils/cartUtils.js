// Produkt zum Warenkorb hinzufügen
export function addToCart(product) {
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];

  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    // Preis als Zahl speichern
    cart.push({ ...product, price: Number(product.price), quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));

}


// Warenkorb auslesen
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Warenkorb löschen (optional)
export function clearCart() {
  localStorage.removeItem("cart");
}

export function getCartItemCount() {
  const storedCart = localStorage.getItem("cart");
  if (!storedCart) return 0;

  const cart = JSON.parse(storedCart);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return totalCount;
}

