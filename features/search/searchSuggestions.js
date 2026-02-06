const path = require("path");
const { readJson } = require("../storage/jsonStore");
const historyFile = path.join(__dirname, "../history/history.json");
const bookmarksFile = path.join(__dirname, "../bookmarks/bookmarks.json");

function getSuggestions(query, options = {}) {
  if (!query) return [];
  const {
    limit = 5,
    includeHistory = true,
    includeBookmarks = true,
    includeTitles = true
  } = options;
  const suggestions = [];

  if (includeHistory) {
    const history = readJson(historyFile, []);
    history.forEach(entry => {
      if (entry.url) suggestions.push(entry.url);
      if (includeTitles && entry.title) suggestions.push(entry.title);
    });
  }

  if (includeBookmarks) {
    const bookmarks = readJson(bookmarksFile, []);
    bookmarks.forEach(bookmark => {
      if (bookmark.url) suggestions.push(bookmark.url);
      if (includeTitles && bookmark.title) suggestions.push(bookmark.title);
    });
  }

  const filtered = suggestions.filter(value => value && value.includes(query));
  const unique = Array.from(new Set(filtered));
  return unique.slice(0, limit);
}

module.exports = { getSuggestions };
