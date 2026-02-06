const input = document.getElementById("search");
const goBtn = document.getElementById("goBtn");
const newTabBtn = document.getElementById("newTabBtn");
const favBtn = document.getElementById("favBtn");

function normalize(value) {
  if (!value.startsWith("http")) {
    return "https://" + value;
  }
  return value;
}

function navigate() {
  const url = normalize(input.value);
  window.electronAPI.navigate(url);
}

function newTab() {
  const url = normalize(input.value || "google.com");
  window.electronAPI.newTab(url);
}

function bookmark() {
  window.electronAPI.bookmark({
    title: input.value,
    url: normalize(input.value)
  });
}

goBtn.onclick = navigate;
newTabBtn.onclick = newTab;
favBtn.onclick = bookmark;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") navigate();
});