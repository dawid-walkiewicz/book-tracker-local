const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  saveCover: (fileData) => ipcRenderer.invoke("save-cover", fileData),
  readFileAsBase64: (filePath) => ipcRenderer.invoke("read-file-as-base64", filePath)
})
