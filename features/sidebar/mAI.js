function createMAIFrame(options = {}) {
  const iframe = document.createElement("iframe");
  iframe.src = options.src || "https://m-ai-officiel.base44.app";
  iframe.className = options.className || "ai-frame";
  if (options.allow) {
    iframe.setAttribute("allow", options.allow);
  }
  return iframe;
}

module.exports = { createMAIFrame };
