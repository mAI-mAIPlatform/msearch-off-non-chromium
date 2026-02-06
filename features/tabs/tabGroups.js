let tabGroups = [];

function createGroup(name) {
  const group = { id: Date.now(), name, tabs: [] };
  tabGroups.push(group);
  return group;
}

function addTabToGroup(groupId, tab) {
  const group = tabGroups.find(g => g.id === groupId);
  if (!group) return;
  group.tabs.push(tab);
}

function getGroups() {
  return tabGroups;
}

module.exports = { createGroup, addTabToGroup, getGroups };