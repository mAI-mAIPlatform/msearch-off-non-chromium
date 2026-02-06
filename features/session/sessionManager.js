const path = require("path");
const { readJson, writeJson } = require("../storage/jsonStore");

const file = path.join(__dirname, "lastSession.json");

function saveTabState(tabState, meta = {}) {
  const payload = {
    tabState,
    meta,
    savedAt: new Date().toISOString()
  };
  writeJson(file, payload);
  return payload;
}

function saveSession(tabs, activeTabId) {
  return saveTabState(tabs, { activeTabId });
}

function loadLastSession() {
  return readJson(file, null);
}

function clearLastSession() {
  writeJson(file, null);
}

module.exports = {
  saveTabState,
  saveSession,
  loadLastSession,
  clearLastSession
};
