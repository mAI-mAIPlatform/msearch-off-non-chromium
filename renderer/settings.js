const settings = {
  autoHttps: document.getElementById("autoHttps"),
  rememberLastPage: document.getElementById("rememberLastPage"),
  glassEffect: document.getElementById("glassEffect"),
  showSidebar: document.getElementById("showSidebar")
};

// Charger paramètres
Object.keys(settings).forEach(key => {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    settings[key].checked = saved === "true";
  }

  // Sauvegarder automatiquement
  settings[key].addEventListener("change", () => {
    localStorage.setItem(key, settings[key].checked);
  });
});

// Reset
document.querySelectorAll(".danger")[1].addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});