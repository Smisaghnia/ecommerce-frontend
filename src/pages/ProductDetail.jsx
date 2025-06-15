import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Produkt nicht gefunden");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Lade Produkt…</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={`/images/products/${product.imageFile}`}
        alt={product.name}
        style={{ width: "300px" }}
      />
      <p>{product.description}</p>
      <p><strong>Preis:</strong> {product.price.toFixed(2)} €</p>
      <p><strong>Lager:</strong> {product.stock}</p>

      <button
        style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}
        onClick={() => addToCart(product)}
      >
        In den Warenkorb
      </button>
    </div>
  );
}

export default ProductDetail;
