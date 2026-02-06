const input = document.getElementById("search");
const goBtn = document.getElementById("goBtn");

function normalize(value) {
  if (!value.startsWith("http")) {
    return "https://" + value;
  }
  return value;
}

function navigate() {
  const url = normalize(input.value.trim());
  window.electronAPI.navigate(url);
}

function newTab() {
  const url = normalize(input.value.trim() || "google.com");
  window.electronAPI.newTab(url);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") navigate();
});

goBtn.addEventListener("click", navigate);

// Ctrl + T = nouvel onglet
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "t") {
    e.preventDefault();
    newTab();
  }
});