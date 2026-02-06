const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: { preload: `${__dirname}/preload.js` }
  });
  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);
