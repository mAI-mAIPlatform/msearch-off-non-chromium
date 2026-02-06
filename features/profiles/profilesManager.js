const path = require("path");
const { readJson, writeJson } = require("../storage/jsonStore");

const file = path.join(__dirname, "profiles.json");

function getProfiles() {
  return readJson(file, []);
}

function createProfile(name, options = {}) {
  if (!name) return null;
  const profiles = getProfiles();
  const profile = {
    id: options.id || Date.now(),
    name,
    settings: options.settings || {},
    bookmarks: options.bookmarks || [],
    history: options.history || [],
    avatar: options.avatar || "",
    createdAt: options.createdAt || new Date().toISOString()
  };
  profiles.push(profile);
  writeJson(file, profiles);
  return profile;
}

function switchProfile(id) {
  const profiles = getProfiles();
  return profiles.find(p => p.id === id);
}

function updateProfile(id, updates = {}) {
  const profiles = getProfiles();
  const profile = profiles.find(item => item.id === id);
  if (!profile) return null;
  Object.assign(profile, updates, { id: profile.id });
  writeJson(file, profiles);
  return profile;
}

function removeProfile(id) {
  const profiles = getProfiles();
  const next = profiles.filter(profile => profile.id !== id);
  writeJson(file, next);
  return next.length !== profiles.length;
}

module.exports = {
  getProfiles,
  createProfile,
  switchProfile,
  updateProfile,
  removeProfile
};
