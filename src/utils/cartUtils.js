// Schlüssel für LocalStorage
const CART_KEY = "cart";

// Warenkorb aus LocalStorage holen oder leeren Array
export function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// Warenkorb in LocalStorage speichern
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Produkt zum Warenkorb hinzufügen
export function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Produktmenge ändern
export function updateQuantity(productId, quantity) {
  let cart = getCart();
  cart = cart.map(item =>
    item.id === productId ? { ...item, quantity } : item
  ).filter(item => item.quantity > 0);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

// Produkt aus Warenkorb entfernen
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}


export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
}