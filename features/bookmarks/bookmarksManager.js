const path = require("path");
const { readJson, writeJson } = require("../storage/jsonStore");

const file = path.join(__dirname, "bookmarks.json");

function getBookmarks(options = {}) {
  const { tag, folder, limit } = options;
  let bookmarks = readJson(file, []);

  if (tag) {
    bookmarks = bookmarks.filter(bookmark => (bookmark.tags || []).includes(tag));
  }

  if (folder) {
    bookmarks = bookmarks.filter(bookmark => bookmark.folder === folder);
  }

  if (Number.isFinite(limit)) {
    return bookmarks.slice(0, limit);
  }

  return bookmarks;
}

function addBookmark(title, url, options = {}) {
  if (!url) return null;
  const bookmarks = getBookmarks();
  const existing = bookmarks.find(bookmark => bookmark.url === url);
  const data = {
    title: title || url,
    url,
    tags: options.tags || [],
    folder: options.folder || "default",
    createdAt: options.createdAt || new Date().toISOString(),
    notes: options.notes || ""
  };

  if (existing) {
    Object.assign(existing, data);
  } else {
    bookmarks.push(data);
  }

  writeJson(file, bookmarks);
  return data;
}

function removeBookmark(url) {
  if (!url) return false;
  const bookmarks = getBookmarks();
  const next = bookmarks.filter(bookmark => bookmark.url !== url);
  writeJson(file, next);
  return next.length !== bookmarks.length;
}

function updateBookmark(url, updates = {}) {
  if (!url) return null;
  const bookmarks = getBookmarks();
  const target = bookmarks.find(bookmark => bookmark.url === url);
  if (!target) return null;
  Object.assign(target, updates, { url: target.url });
  writeJson(file, bookmarks);
  return target;
}

function isBookmarked(url) {
  if (!url) return false;
  return getBookmarks().some(bookmark => bookmark.url === url);
}

module.exports = {
  getBookmarks,
  addBookmark,
  removeBookmark,
  updateBookmark,
  isBookmarked
};
