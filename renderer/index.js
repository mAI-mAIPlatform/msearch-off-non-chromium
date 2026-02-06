// ===============================
// mSearch – renderer/index.js
// UI logic uniquement
// ===============================

// Import des features (logique séparée)
const { normalize } = require("../features/navigation/urlHandler");
const settingsService = require("../services/settingsService");
const versionData = require("../config/version.json");

// ===============================
// Sélecteurs UI
// ===============================
const searchInput = document.getElementById("search");
const goBtn = document.getElementById("goBtn");
const settingsBtn = document.getElementById("settingsBtn");
const sidebar = document.querySelector(".sidebar");
const versionLabel = document.querySelector(".version");

// ===============================
// Initialisation
// ===============================

// Affichage de la version
if (versionLabel) {
  versionLabel.textContent =
    `v${versionData.version} • ${versionData.channel} ${versionData.build}`;
}

// Appliquer les paramètres UI au démarrage
applySettings();

// ===============================
// Navigation
// ===============================
function navigate() {
  const input = searchInput.value.trim();
  if (!input) return;

  const url = normalize(input);
  window.electronAPI.navigate(url);

  searchInput.value = "";
}

// ===============================
// Événements
// ===============================
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    navigate();
  }
});

goBtn.addEventListener("click", navigate);

settingsBtn.addEventListener("click", () => {
  window.electronAPI.navigate(
    "file://" + __dirname + "/settings.html"
  );
});

// ===============================
// Paramètres UI
// ===============================
function applySettings() {
  // Sidebar mAI
  const showSidebar = settingsService.get("showSidebar");
  if (sidebar) {
    sidebar.style.display = showSidebar ? "flex" : "none";
  }

  // Liquid Glass (toggle futur)
  const glass = settingsService.get("liquidGlass");
  document.body.classList.toggle("no-glass", !glass);

  // Mode clair / sombre (base)
  const darkMode = settingsService.get("darkMode");
  document.body.classList.toggle("light", !darkMode);
}

// ===============================
// Exposition future (debug / extensions)
// ===============================
window.mSearch = {
  navigate,
  version: versionData,
  settings: settingsService
};