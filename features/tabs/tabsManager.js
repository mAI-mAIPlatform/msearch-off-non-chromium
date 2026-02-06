const { BrowserView } = require("electron");

let tabs = [];
let currentTab = null;

function createTab(win, url) {
  const view = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setBrowserView(view);

  view.setBounds({
    x: 320,      // largeur sidebar mAI
    y: 64,       // hauteur topbar
    width: win.getBounds().width - 320,
    height: win.getBounds().height - 64
  });

  view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL(url);

  const tab = {
    id: Date.now(),
    view,
    url
  };

  tabs.push(tab);
  currentTab = tab;

  return tab;
}

function switchTab(win, id) {
  const tab = tabs.find(t => t.id === id);
  if (!tab) return;

  win.setBrowserView(tab.view);
  currentTab = tab;
}

function getTabs() {
  return tabs;
}

module.exports = {
  createTab,
  switchTab,
  getTabs
};