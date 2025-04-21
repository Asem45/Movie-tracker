import React from "react";
import genreList from "../data/genreList";

const GenreFilter = ({ current, onChange }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
      {genreList.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: current === genre ? "#007bff" : "#eee",
            color: current === genre ? "#fff" : "#000",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;