let tabs = [];

function create(url) {
  const tab = {
    id: Date.now(),
    url
  };
  tabs.push(tab);
  return tab;
}

function list() {
  return tabs;
}

module.exports = { create, list };