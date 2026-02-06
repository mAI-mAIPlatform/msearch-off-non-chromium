const { BrowserView } = require("electron");

let tabs = [];
let currentTab = null;

function createTab(win, url, options = {}) {
  const view = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      ...options.webPreferences
    }
  });

  win.setBrowserView(view);

  const bounds = options.bounds || {};

  view.setBounds({
    x: bounds.x ?? 320,      // largeur sidebar mAI
    y: bounds.y ?? 64,       // hauteur topbar
    width: bounds.width ?? win.getBounds().width - 320,
    height: bounds.height ?? win.getBounds().height - 64
  });

  view.setAutoResize({ width: true, height: true });
  if (url) {
    view.webContents.loadURL(url);
  }

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
