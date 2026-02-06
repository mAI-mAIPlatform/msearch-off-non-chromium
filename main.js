const { app, BrowserWindow, BrowserView, ipcMain, nativeImage } = require("electron");
const path = require("path");

// Managers
const history = require("./features/history/historyManager");
const bookmarks = require("./features/bookmarks/bookmarksManager");
const profiles = require("./features/profiles/profilesManager");
const downloads = require("./features/downloads/downloadsManager");
const reminders = require("./features/reminders/remindersManager");
const notes = require("./features/notes/notesManager");
const categories = require("./features/categories/categoriesManager");
const tabGroups = require("./features/tabs/tabGroups");
const settingsService = require("./features/settings/settingsManager");
const versionData = require("./config/version.json");

let win;
let tabs = [];
let currentTab = null;

// ======================
// ONGLET / TAB
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
    history.addHistory(view.webContents.getTitle(), view.webContents.getURL());
  });

  const tab = { id: Date.now(), view };
  tabs.push(tab);
  currentTab = tab;
  return tab;
}

function switchTab(id) {
  const tab = tabs.find(t => t.id === id);
  if (!tab) return;
  win.setBrowserView(tab.view);
  currentTab = tab;
}

// ======================
// FENETRE
// ======================
function createWindow() {
  const logoPath = path.join(__dirname, "assets", "logo.png");
  const icon = nativeImage.createFromPath(logoPath);

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: `mSearch v${versionData.version} ${versionData.channel} ${versionData.build}`,
    icon, // Logo Windows
    backgroundColor: "#0e0f12",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("renderer/index.html");

  // Onglet par défaut
  const homepage = settingsService.loadSettings().homepage || "https://www.google.com";
  createTab(homepage);
}

// ======================
// IPC
// ======================
ipcMain.on("navigate", (_, url) => {
  if (currentTab) currentTab.view.webContents.loadURL(url);
});

ipcMain.on("new-tab", (_, url) => createTab(url));

ipcMain.on("bookmark", (_, data) => bookmarks.addBookmark(data.title, data.url));

ipcMain.on("add-profile", (_, name) => profiles.createProfile(name));

ipcMain.on("new-download", (_, file) => downloads.addDownload(file.name, file.url));

ipcMain.on("add-reminder", (_, data) => reminders.addReminder(data.text, data.date));

ipcMain.on("add-note", (_, data) => notes.addNote(data.title, data.content));

ipcMain.on("add-category", (_, name) => categories.addCategory(name));

ipcMain.on("new-tab-group", (_, name) => tabGroups.createGroup(name));

// ======================
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});