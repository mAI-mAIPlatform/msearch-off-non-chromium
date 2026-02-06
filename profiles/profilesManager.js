const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "profiles.json");

function getProfiles() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function createProfile(name) {
  const profiles = getProfiles();
  const profile = { id: Date.now(), name, settings: {}, bookmarks: [], history: [] };
  profiles.push(profile);
  fs.writeFileSync(file, JSON.stringify(profiles, null, 2));
  return profile;
}

function switchProfile(id) {
  const profiles = getProfiles();
  return profiles.find(p => p.id === id);
}

module.exports = { getProfiles, createProfile, switchProfile };