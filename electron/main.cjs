const { app, BrowserWindow, ipcMain } = require("electron")
const fs = require("fs")
const path = require("path")

const coversDir = path.join(app.getPath("userData"), "covers")

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"))
  }
}

app.whenReady().then(() => {
  ipcMain.handle("save-cover", async (event, {name, data}) => {
    const filePath = path.join(coversDir, name)
    fs.writeFileSync(filePath, Buffer.from(data))
    return filePath
  })

  ipcMain.handle('read-file-as-base64', async (_event, filePath) => {
    try {
      const fs = require("fs")
      const path = require("path")
      const ext = path.extname(filePath).slice(1)
      const data = fs.readFileSync(filePath, { encoding: 'base64' })
      return `data:image/${ext};base64,${data}`
    } catch (e) {
      return null
    }
  })

  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
