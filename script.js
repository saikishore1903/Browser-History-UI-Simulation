let history = [];

function addURL() {
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  if (url === "") {
    alert("Please enter a URL");
    return;
  }

  const timestamp = new Date().toLocaleString();
  history.push({ url, timestamp });

  urlInput.value = "";
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("historyList");
  const historyLength = document.getElementById("historyLength").value;

  let displayedHistory = [...history];

  if (historyLength !== "All") {
    displayedHistory = displayedHistory.slice(-parseInt(historyLength));
  }

  historyList.innerHTML = "";

  if (displayedHistory.length === 0) {
    historyList.innerHTML = "<p>No browsing history</p>";
    return;
  }

  displayedHistory.reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = <strong>${entry.url}</strong><div class="timestamp">${entry.timestamp}</div>;
    historyList.appendChild(div);
  });
}

function clearHistory() {
  if (confirm("Are you sure you want to clear your browsing history?")) {
    history = [];
    renderHistory();
  }
}
