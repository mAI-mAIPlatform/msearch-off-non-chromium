const defaults = require("../config/defaults.json");

function get(key) {
  const value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : defaults[key];
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

module.exports = { get, set };