import React, { useState } from "react";

function SearchBar({ onResults, setSearchQuery }) {
  const [input, setInput] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setInput(query);
    setSearchQuery(query);

    if (!query) {
      onResults([]);
      return;
    }

    const apiKey = "6c005dc36b13cbdd544ca3377d0adbf0";

    try {
      const [page1Res, page2Res] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=2`
        ),
      ]);

      const data1 = await page1Res.json();
      const data2 = await page2Res.json();

      const combined = [...(data1.results || []), ...(data2.results || [])];

      onResults(combined.slice(0, 24));
    } catch (error) {
      console.error("Search failed:", error);
      onResults([]);
    }
  };

  return (
    <input
      type="text"
      value={input}
      onChange={handleSearch}
      placeholder="Search movies, series or anime..."
      style={{
        padding: "0.5rem",
        margin: "1rem 0",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
      }}
    />
  );
}

export default SearchBar;