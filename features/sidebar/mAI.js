function createMAIFrame() {
  const iframe = document.createElement("iframe");
  iframe.src = "https://m-ai-officiel.base44.app";
  iframe.className = "ai-frame";
  return iframe;
}

module.exports = { createMAIFrame };