const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "lastSession.json");

function saveTabState(tab) {
  fs.writeFileSync(file, JSON.stringify(tab, null, 2));
}

function loadLastSession() {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file));
}

module.exports = { saveTabState, loadLastSession };