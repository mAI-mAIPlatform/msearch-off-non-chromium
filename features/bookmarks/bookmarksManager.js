const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "bookmarks.json");

function getBookmarks() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function addBookmark(title, url) {
  const bookmarks = getBookmarks();
  bookmarks.push({ title, url });
  fs.writeFileSync(file, JSON.stringify(bookmarks, null, 2));
}

module.exports = { getBookmarks, addBookmark };