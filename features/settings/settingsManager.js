const path = require("path");
const { readJson, writeJson } = require("../storage/jsonStore");

const settingsPath = path.join(__dirname, "settings.json");

const defaultSettings = {
  theme: "dark",
  homepage: "https://www.google.com",
  searchEngine: "https://www.google.com/search?q=",
  sidebarEnabled: true,
  language: "fr",
  restoreSession: true,
  openTabsInBackground: false,
  suggestionsLimit: 5,
  readerModeEnabled: false,
  defaultZoom: 1,
  downloadsPath: "",
  privacyMode: "standard"
};

function loadSettings() {
  const stored = readJson(settingsPath, {});
  const merged = { ...defaultSettings, ...stored };
  writeJson(settingsPath, merged);
  return merged;
}

function saveSettings(settings) {
  const merged = { ...defaultSettings, ...settings };
  writeJson(settingsPath, merged);
  return merged;
}

function updateSettings(partial) {
  const current = loadSettings();
  return saveSettings({ ...current, ...partial });
}

module.exports = { loadSettings, saveSettings, updateSettings, defaultSettings };
