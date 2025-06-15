import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Produkte");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Lade Produkte…</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "4px" }}
        >
          <img
            src={`/images/products/${product.imageFile}`}
            alt={product.name}
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
          />
          <h3>{product.name}</h3>
          <p>Kategorie: {product.categoryName}</p>
          <p>Preis: {product.price.toFixed(2)} €</p>
          <Link to={`/products/${product.id}`}>
            <button style={{ marginTop: "0.5rem" }}>Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
