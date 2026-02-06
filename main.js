const { app, BrowserWindow, BrowserView, ipcMain, nativeImage } = require("electron");
const path = require("path");

// Managers
const history = require("./features/history/historyManager");
const bookmarks = require("./features/bookmarks/bookmarksManager");
const settingsService = require("./features/settings/settingsManager");

// Variables globales
let win;
let tabs = [];
let currentTab = null;

// ======================
// FONCTIONS ONGLET
// ======================
function createTab(url) {
  const view = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setBrowserView(view);

  const bounds = win.getBounds();

  view.setBounds({
    x: 320,       // sidebar mAI
    y: 64,        // topbar
    width: bounds.width - 320,
    height: bounds.height - 64
  });

  view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL(url);

  // Historique
  view.webContents.on("did-finish-load", () => {
    history.addHistory(view.webContents.getTitle(), view.webContents.getURL());
  });

  const tab = { id: Date.now(), view, url };
  tabs.push(tab);
  currentTab = tab;

  return tab;
}

// Changer d'onglet
function switchTab(id) {
  const tab = tabs.find(t => t.id === id);
  if (!tab) return;
  win.setBrowserView(tab.view);
  currentTab = tab;
}

// ======================
// CREATE WINDOW
// ======================
function createWindow() {
  // Charger logo
  const logoPath = path.join(__dirname, "assets", "logo.png");
  const logo = nativeImage.createFromPath(logoPath);

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "mSearch",
    icon: logo,             // <-- logo mSearch ici
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Charger UI principale
  win.loadFile("renderer/index.html");

  // Onglet par défaut
  const homepage = settingsService.loadSettings().homepage || "https://www.google.com";
  createTab(homepage);
}

// ======================
// IPC COMMUNICATION
// ======================
ipcMain.on("navigate", (_, url) => {
  if (currentTab) currentTab.view.webContents.loadURL(url);
});

ipcMain.on("new-tab", (_, url) => {
  createTab(url);
});

ipcMain.on("add-bookmark", (_, data) => {
  bookmarks.addBookmark(data.title, data.url);
});

// ======================
// READY
// ======================
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});