function normalize(input, options = {}) {
  if (!input) return "";
  const searchEngine = options.searchEngine || "https://www.google.com/search?q=";

  if (!input.includes(".") || input.includes(" ")) {
    return searchEngine + encodeURIComponent(input);
  }

  if (!input.startsWith("http")) {
    return "https://" + input;
  }

  return input;
}

module.exports = { normalize };
