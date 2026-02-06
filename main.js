const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const path = require("path");

let win;
let tabs = [];
let currentTab = null;

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
    x: 320,      // sidebar mAI
    y: 64,       // topbar
    width: bounds.width - 320,
    height: bounds.height - 64
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
}

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: "#0a0a0a",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("renderer/index.html");

  // Onglet par défaut
  createTab("https://www.google.com");
}

ipcMain.on("navigate", (_, url) => {
  if (currentTab) currentTab.view.webContents.loadURL(url);
});

ipcMain.on("new-tab", (_, url) => {
  createTab(url);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});