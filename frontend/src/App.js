import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = "";

  // Fetch all items from Flask API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/items`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add a new item to the DB
  const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setItems([...items, data]);
      setName("");
    } catch (err) {
      setError("Failed to add item");
    }
  };

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h2> Enter your data</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={addItem}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add</button>
      </form>
      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
