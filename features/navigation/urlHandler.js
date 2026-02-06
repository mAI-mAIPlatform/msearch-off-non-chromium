function normalize(input) {
  if (!input.includes(".") || input.includes(" ")) {
    return "https://www.google.com/search?q=" + encodeURIComponent(input);
  }

  if (!input.startsWith("http")) {
    return "https://" + input;
  }

  return input;
}

module.exports = { normalize };