function enableReaderMode() {
  document.body.querySelector(".sidebar").style.display = "none";
  document.body.querySelector(".topbar").style.display = "none";
  document.body.style.background = "#0a0a0a";
}

function disableReaderMode() {
  document.body.querySelector(".sidebar").style.display = "flex";
  document.body.querySelector(".topbar").style.display = "flex";
  document.body.style.background = "";
}

module.exports = { enableReaderMode, disableReaderMode };