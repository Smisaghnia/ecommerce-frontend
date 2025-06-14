import React, { useState } from "react";
import products from "../data/products";
import { Link } from "react-router-dom";

function ProductList() {
  const [category, setCategory] = useState("Alle");

  // Kategorie-Filter anwenden
  const filteredProducts =
    category === "Alle"
      ? products
      : products.filter((product) => product.category === category);

  const categories = ["Alle", ...new Set(products.map((p) => p.category))];

  return (
    <div>
      <h2>🛒 Produktübersicht</h2>

      {/* Kategorie-Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Kategorie: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Produkt-Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.price.toFixed(2)} €</p>
            <Link to={`/products/${product.id}`}>Details ansehen</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
