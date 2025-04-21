import React from "react";

const CategoryTabs = ({ current, onChange }) => {
  const categories = ["Movies", "Series", "Anime"];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: current === cat ? "#333" : "#eee",
            color: current === cat ? "#fff" : "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;