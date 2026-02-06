const fs = require("fs");
const path = require("path");

const categoriesFile = path.join(__dirname, "categories.json");

function addCategory(name) {
  const categories = fs.existsSync(categoriesFile)
    ? JSON.parse(fs.readFileSync(categoriesFile))
    : [];

  categories.push({ id: Date.now(), name });
  fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2));
}

function getCategories() {
  if (!fs.existsSync(categoriesFile)) return [];
  return JSON.parse(fs.readFileSync(categoriesFile));
}

function removeCategory(id) {
  let categories = getCategories();
  categories = categories.filter(c => c.id !== id);
  fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2));
}

module.exports = { addCategory, getCategories, removeCategory };