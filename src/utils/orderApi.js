export async function submitOrder(orderData) {
  const response = await fetch("http://localhost:8081/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Fehler bei der Bestellung");
  }

  return response.json();
}
