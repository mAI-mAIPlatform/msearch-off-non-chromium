const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  navigate: (url) => ipcRenderer.send("navigate", url),
  newTab: (url) => ipcRenderer.send("new-tab", url)
});