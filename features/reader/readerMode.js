function enableReaderMode() {
  const sidebar = document.body.querySelector(".sidebar");
  const topbar = document.body.querySelector(".topbar");
  if (sidebar) sidebar.style.display = "none";
  if (topbar) topbar.style.display = "none";
  document.body.style.background = "#0a0a0a";
}

function disableReaderMode() {
  const sidebar = document.body.querySelector(".sidebar");
  const topbar = document.body.querySelector(".topbar");
  if (sidebar) sidebar.style.display = "flex";
  if (topbar) topbar.style.display = "flex";
  document.body.style.background = "";
}

module.exports = { enableReaderMode, disableReaderMode };
