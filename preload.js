const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  navigate: (url) => ipcRenderer.send("navigate", url),
  newTab: (url) => ipcRenderer.send("new-tab", url),
  bookmark: (data) => ipcRenderer.send("bookmark", data),
  addProfile: (name) => ipcRenderer.send("add-profile", name),
  newDownload: (file) => ipcRenderer.send("new-download", file),
  addReminder: (data) => ipcRenderer.send("add-reminder", data),
  addNote: (data) => ipcRenderer.send("add-note", data),
  addCategory: (name) => ipcRenderer.send("add-category", name),
  newTabGroup: (name) => ipcRenderer.send("new-tab-group", name)
});