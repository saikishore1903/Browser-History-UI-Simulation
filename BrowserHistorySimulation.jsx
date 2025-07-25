import React, { useState } from "react";

// Utility function to format date as a readable string
function formatDate(date) {
  return new Date(date).toLocaleString();
}

export default function BrowserHistorySimulation() {
  // State to manage history list, input field, and configurable history length (N)
  const [history, setHistory] = useState([]); // {url, timestamp}
  const [urlInput, setUrlInput] = useState("");
  const [historyLength, setHistoryLength] = useState(5);

  // Add a new URL visit to history, ensuring uniqueness and recency
  const visitPage = () => {
    const url = urlInput.trim();
    if (!url) return;
    setHistory((prev) => {
      // Remove duplicates (case-insensitive check)
      const filtered = prev.filter(
        (entry) => entry.url.toLowerCase() !== url.toLowerCase()
      );
      // Add this new visit at the top
      return [{ url, timestamp: new Date() }, ...filtered];
    });
    setUrlInput(""); // Clear input field
  };

  // Only return the N most recent unique URLs
  const getMostRecentHistory = () => history.slice(0, historyLength);

  // Clear the entire history list
  const clearHistory = () => setHistory([]);

  // Update the history length when the user changes it
  const onHistoryLengthChange = (e) => {
    const val = parseInt(e.target.value || "0", 10);
    if (val > 0) setHistoryLength(val);
  };

  // Allow Enter key in input to visit page
  const onInputKeyDown = (e) => {
    if (e.key === "Enter") visitPage();
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", fontFamily: "sans-serif" }}>
      <h2>Browser History UI Simulation</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={onInputKeyDown}
          style={{ width: 300, padding: 4, marginRight: 8 }}
        />
        <button onClick={visitPage} style={{ marginRight: 8 }}>Visit Page</button>
        <button onClick={clearHistory}>Clear History</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          Show last&nbsp;
          <input
            type="number"
            min="1"
            max="50"
            value={historyLength}
            onChange={onHistoryLengthChange}
            style={{ width: 60 }}
          />
          &nbsp;unique URLs
        </label>
      </div>
      <hr />
      <h3>Recent History</h3>
      <ul>
        {getMostRecentHistory().length === 0 && (
          <li style={{ color: "#777" }}>No history yet.</li>
        )}
        {getMostRecentHistory().map((entry) => (
          <li key={entry.url} style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: "bold" }}>{entry.url}</span>
            <br />
            <small>Last visited: {formatDate(entry.timestamp)}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
