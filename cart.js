// cart.js — persistent cart for a static website (LocalStorage)
const CART_KEY = "alethinos_cart_v1";

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
  updateCartBar();
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadges();
  updateCartBar();
}

export function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(x => x.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart(cart);
}

export function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(0, parseInt(qty || 0, 10));
  saveCart(cart.filter(x => x.qty > 0));
}

export function cartCount() {
  return getCart().reduce((sum, x) => sum + (x.qty || 0), 0);
}

export function cartTotal() {
  return getCart().reduce((sum, x) => sum + (x.qty * x.price), 0);
}

export function formatFCFA(n) {
  return (n || 0).toLocaleString("fr-FR") + " FCFA";
}

export function ensureOrderId() {
  const key = "alethinos_order_id_v1";
  let id = localStorage.getItem(key);
  if (!id) {
    id = "CMD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem(key, id);
  }
  return id;
}

export function updateCartBadges() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-badge]").forEach(el => {
    el.textContent = String(count);
    el.style.display = count > 0 ? "inline-block" : "none";
  });
}

export function updateCartBar(){
  const bar = document.getElementById("cartbar");
  const totalEl = document.getElementById("cartbarTotal");
  if (!bar || !totalEl) return;
  const count = cartCount();
  if (count > 0){
    bar.style.display = "block";
    totalEl.textContent = formatFCFA(cartTotal());
  } else {
    bar.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  updateCartBar();
});
