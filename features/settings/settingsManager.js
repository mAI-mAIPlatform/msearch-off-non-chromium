const fs = require("fs");
const path = require("path");

const settingsPath = path.join(__dirname, "settings.json");

const defaultSettings = {
  theme: "dark",
  homepage: "https://www.google.com",
  searchEngine: "https://www.google.com/search?q=",
  sidebarEnabled: true
};

function loadSettings() {
  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
    return defaultSettings;
  }
  return JSON.parse(fs.readFileSync(settingsPath));
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

module.exports = { loadSettings, saveSettings };