const settingsService = require("../features/settings/settingsManager");
const versionData = require("../config/version.json");

const settingsInputs = document.querySelectorAll("[data-setting]");
const footer = document.querySelector(".settings-footer p");

// ======================
// Afficher version
// ======================
if (footer) {
  footer.textContent =
    `mSearch — version ${versionData.version} • ${versionData.channel} ${versionData.build}`;
}

// ======================
// Charger les paramètres
// ======================
settingsInputs.forEach(input => {
  const key = input.dataset.setting;
  const value = settingsService.loadSettings()[key];
  if (input.type === "checkbox") {
    input.checked = value;
  } else {
    input.value = value;
  }

  input.addEventListener("change", () => {
    const newSettings = settingsService.loadSettings();
    if (input.type === "checkbox") {
      newSettings[key] = input.checked;
    } else {
      newSettings[key] = input.value;
    }
    settingsService.saveSettings(newSettings);
  });
});