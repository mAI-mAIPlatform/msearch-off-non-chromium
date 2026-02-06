const input = document.getElementById("search");
const goBtn = document.getElementById("goBtn");
const newTabBtn = document.getElementById("newTabBtn");
const favBtn = document.getElementById("favBtn");
const versionLabel = document.querySelector(".version");

const versionData = require("../config/version.json");

// ======================
// Version dynamique
// ======================
if (versionLabel) {
  versionLabel.textContent =
    `v${versionData.version} • ${versionData.channel} ${versionData.build}`;
}

// ======================
// Normalisation URL
// ======================
function normalize(value) {
  if (!value.startsWith("http")) {
    return "https://" + value;
  }
  return value;
}

// ======================
// Actions
// ======================
function navigate() {
  const url = normalize(input.value.trim());
  window.electronAPI.navigate(url);
}

function newTab() {
  const url = normalize(input.value.trim() || "https://www.google.com");
  window.electronAPI.newTab(url);
}

function bookmark() {
  window.electronAPI.bookmark({
    title: input.value,
    url: normalize(input.value)
  });
}

// ======================
// Event listeners
// ======================
goBtn.onclick = navigate;
newTabBtn.onclick = newTab;
favBtn.onclick = bookmark;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") navigate();
});

// Ctrl + T = nouvel onglet
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "t") {
    e.preventDefault();
    newTab();
  }
});