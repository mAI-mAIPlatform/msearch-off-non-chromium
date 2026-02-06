const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "history.json");

function addHistory(title, url) {
  const history = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file))
    : [];

  history.push({
    title,
    url,
    date: new Date().toISOString()
  });

  fs.writeFileSync(file, JSON.stringify(history, null, 2));
}

module.exports = { addHistory };