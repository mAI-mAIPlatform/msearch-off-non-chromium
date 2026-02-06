const path = require("path");
const { readJson, writeJson } = require("../storage/jsonStore");

const file = path.join(__dirname, "history.json");

function addHistory(title, url, options = {}) {
  if (!url) return null;
  const history = readJson(file, []);
  const entry = {
    id: options.id || Date.now(),
    title: title || url,
    url,
    date: options.date || new Date().toISOString(),
    referrer: options.referrer || "",
    favicon: options.favicon || "",
    durationMs: Number.isFinite(options.durationMs) ? options.durationMs : null
  };

  history.push(entry);
  writeJson(file, history);
  return entry;
}

function getHistory(options = {}) {
  const { limit, query, since } = options;
  let history = readJson(file, []);

  if (query) {
    history = history.filter(entry =>
      (entry.title || "").includes(query) || (entry.url || "").includes(query)
    );
  }

  if (since) {
    const sinceDate = new Date(since);
    if (!Number.isNaN(sinceDate.getTime())) {
      history = history.filter(entry => new Date(entry.date) >= sinceDate);
    }
  }

  if (Number.isFinite(limit)) {
    return history.slice(-limit);
  }

  return history;
}

function removeHistoryByUrl(url) {
  if (!url) return false;
  const history = readJson(file, []);
  const next = history.filter(entry => entry.url !== url);
  writeJson(file, next);
  return next.length !== history.length;
}

function clearHistory() {
  writeJson(file, []);
}

module.exports = {
  addHistory,
  getHistory,
  removeHistoryByUrl,
  clearHistory
};
