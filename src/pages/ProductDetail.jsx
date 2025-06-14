import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { addToCart } from "../utils/cartUtils"; // <- NEU

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  if (!product) return <p>❌ Produkt nicht gefunden</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <p>{product.description}</p>
      <p><strong>Preis:</strong> {product.price.toFixed(2)} €</p>
      <p><strong>Lager:</strong> {product.stock}</p>

      <button
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        onClick={() => addToCart(product)} // <- NEU
      >
        In den Warenkorb
      </button>
    </div>
  );
}

export default ProductDetail;
