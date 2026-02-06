const { app, BrowserWindow, BrowserView, ipcMain, nativeImage } = require("electron");
const path = require("path");

const history = require("./features/history/historyManager");
const bookmarks = require("./features/bookmarks/bookmarksManager");

let win;
let tabs = [];
let currentTab = null;

// ======================
// ONGLET
// ======================
function createTab(url) {
  const view = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setBrowserView(view);

  const { width, height } = win.getBounds();

  view.setBounds({
    x: 320,
    y: 70,
    width: width - 320,
    height: height - 70
  });

  view.setAutoResize({ width: true, height: true });

  view.webContents.loadURL(url);

  view.webContents.on("did-finish-load", () => {
    history.addHistory(
      view.webContents.getTitle(),
      view.webContents.getURL()
    );
  });

  const tab = { id: Date.now(), view };
  tabs.push(tab);
  currentTab = tab;
}

// ======================
// WINDOW
// ======================
function createWindow() {
  const logoPath = path.join(__dirname, "assets", "logo.png");
  const icon = nativeImage.createFromPath(logoPath);

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "mSearch",
    icon, // 🔥 LOGO WINDOWS
    backgroundColor: "#0e0f12",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("renderer/index.html");

  createTab("https://google.com");
}

app.whenReady().then(createWindow);

// ======================
// IPC
// ======================
ipcMain.on("navigate", (_, url) => {
  if (currentTab) currentTab.view.webContents.loadURL(url);
});

ipcMain.on("new-tab", (_, url) => createTab(url));

ipcMain.on("bookmark", (_, data) => {
  bookmarks.addBookmark(data.title, data.url);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});