const fs = require("fs");
const path = require("path");
const historyFile = path.join(__dirname, "../history/history.json");
const bookmarksFile = path.join(__dirname, "../bookmarks/bookmarks.json");

function getSuggestions(query) {
  let suggestions = [];
  
  if (fs.existsSync(historyFile)) {
    const history = JSON.parse(fs.readFileSync(historyFile));
    suggestions.push(...history.map(h => h.url));
  }

  if (fs.existsSync(bookmarksFile)) {
    const bookmarks = JSON.parse(fs.readFileSync(bookmarksFile));
    suggestions.push(...bookmarks.map(b => b.url));
  }

  return suggestions.filter(u => u.includes(query)).slice(0, 5);
}

module.exports = { getSuggestions };