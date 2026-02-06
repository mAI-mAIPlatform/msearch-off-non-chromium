const fs = require("fs");
const path = require("path");

const downloadsFile = path.join(__dirname, "downloads.json");

function addDownload(name, url) {
  const downloads = fs.existsSync(downloadsFile)
    ? JSON.parse(fs.readFileSync(downloadsFile))
    : [];

  downloads.push({ name, url, date: new Date().toISOString() });
  fs.writeFileSync(downloadsFile, JSON.stringify(downloads, null, 2));
}

function getDownloads() {
  if (!fs.existsSync(downloadsFile)) return [];
  return JSON.parse(fs.readFileSync(downloadsFile));
}

module.exports = { addDownload, getDownloads };