import React from "react";

const RatingTabs = ({ current, onChange }) => {
  const ratings = ["Favorites", "Good"];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      {ratings.map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: current === rating ? "#555" : "#eee",
            color: current === rating ? "#fff" : "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default RatingTabs;