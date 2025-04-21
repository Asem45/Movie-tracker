import React, { useState, useEffect } from "react";
import CategoryTabs from "./components/CategoryTabs";
import RatingTabs from "./components/RatingTabs";
import GenreFilter from "./components/GenreFilter";
import SearchBar from "./components/SearchBar";

function App() {
  const [activeCategory, setActiveCategory] = useState("Movies");
  const [activeRating, setActiveRating] = useState("Favorites");
  const [activeGenre, setActiveGenre] = useState("Action");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedList, setSavedList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("list"); // "list" or "search"

  const currentKey = `${activeCategory}_${activeRating}_${activeGenre}`;

  const handleAddToList = (item) => {
    const stored = localStorage.getItem(currentKey);
    const currentList = stored ? JSON.parse(stored) : [];

    const alreadyExists = currentList.some((i) => i.id === item.id);
    if (!alreadyExists) {
      const updatedList = [...currentList, item];
      localStorage.setItem(currentKey, JSON.stringify(updatedList));
      setSavedList(updatedList);
    }
  };

  const handleRemoveFromList = (item) => {
    const stored = localStorage.getItem(currentKey);
    const currentList = stored ? JSON.parse(stored) : [];

    const updatedList = currentList.filter((i) => i.id !== item.id);
    localStorage.setItem(currentKey, JSON.stringify(updatedList));
    setSavedList(updatedList);
  };

  useEffect(() => {
    const stored = localStorage.getItem(currentKey);
    setSavedList(stored ? JSON.parse(stored) : []);
  }, [activeCategory, activeRating, activeGenre]);
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);  

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#f1f1f1" : "#333",
        transition: "all 0.3s ease",
      }}
    >
      <h1>🎬 My Media Tracker</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: darkMode ? "#f1f1f1" : "#333",
            color: darkMode ? "#333" : "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={() => setView("list")}
          style={{
            marginRight: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "list" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📂 Saved List
        </button>

        <button
          onClick={() => setView("search")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: view === "search" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>

      {view === "list" ? (
        <>
          <CategoryTabs current={activeCategory} onChange={setActiveCategory} />
          <RatingTabs current={activeRating} onChange={setActiveRating} />
          <GenreFilter current={activeGenre} onChange={setActiveGenre} />

          <h2>📂 My Saved List</h2>
          {savedList.length === 0 ? (
            <p style={{ color: "#999" }}>Nothing saved in this category yet.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {savedList.map((item) => (
                <div
                  key={item.id}
                  style={{
                    textAlign: "center",
                    maxWidth: "200px",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "auto",
                      maxWidth: "150px",
                      objectFit: "cover",
                      marginBottom: "1rem",
                    }}
                  />
                  <p>{item.title || item.name}</p>
                  <button
                    onClick={() => handleRemoveFromList(item)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <SearchBar
            onResults={setSearchResults}
            setSearchQuery={setSearchQuery}
          />
          {searchQuery &&
            Array.isArray(searchResults) &&
            searchResults.length > 0 && (
              <>
                <h2>🔍 Search Results</h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  {searchResults.map((item) => (
                    <div key={item.id} style={{ textAlign: "center" }}>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title || item.name}
                        style={{
                          borderRadius: "10px",
                          width: "100%",
                          height: "auto",
                          maxWidth: "150px",
                          objectFit: "cover",
                          marginBottom: "1rem",
                        }}
                      />
                      <p>{item.title || item.name}</p>
                      <button
                        onClick={() => handleAddToList(item)}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.4rem 0.8rem",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ➕ Add to My List
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
        </>
      )}
    </div>
  );
}

export default App;