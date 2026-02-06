const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

// Navigation depuis la barre de recherche
ipcMain.on('navigate', (event, url) => {
  if (!url.startsWith('http')) url = 'https://' + url;
  win.loadURL(url);
});