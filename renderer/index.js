const input = document.getElementById("search");
const goBtn = document.getElementById("goBtn");
const newTabBtn = document.getElementById("newTabBtn");
const favBtn = document.getElementById("favBtn");
const versionLabel = document.querySelector(".version");

const versionData = require("../config/version.json");

// Version dynamique
if (versionLabel) {
  versionLabel.textContent =
    `v${versionData.version} • ${versionData.channel} ${versionData.build}`;
}

function normalize(value) {
  if (!value.startsWith("http")) return "https://" + value;
  return value;
}

// Actions
function navigate() {
  const url = normalize(input.value);
  window.electronAPI.navigate(url);
}

function newTab() {
  const url = normalize(input.value || "https://www.google.com");
  window.electronAPI.newTab(url);
}

function bookmark() {
  window.electronAPI.bookmark({ title: input.value, url: normalize(input.value) });
}

// Nouveaux boutons pour fonctionnalités avancées
function addProfile(name) { window.electronAPI.addProfile(name); }
function newDownload(file) { window.electronAPI.newDownload(file); }
function addReminder(text, date) { window.electronAPI.addReminder({ text, date }); }
function addNote(title, content) { window.electronAPI.addNote({ title, content }); }
function addCategory(name) { window.electronAPI.addCategory(name); }
function newTabGroup(name) { window.electronAPI.newTabGroup(name); }

// Events
goBtn.onclick = navigate;
newTabBtn.onclick = newTab;
favBtn.onclick = bookmark;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") navigate();
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "t") { e.preventDefault(); newTab(); }
});