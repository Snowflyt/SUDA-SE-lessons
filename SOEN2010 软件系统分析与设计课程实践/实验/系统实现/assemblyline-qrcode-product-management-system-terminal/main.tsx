import { app, BrowserWindow, ipcMain } from 'electron'
import electronReloader from 'electron-reloader'

try {
  electronReloader(module)
} catch (_) {}

let mainWindow: BrowserWindow | null = null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.webContents.openDevTools()
  void mainWindow.loadFile('index.html')
  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('window-close', () => {
  app.quit()
})

ipcMain.on('window-minimize', () => {
  mainWindow?.minimize()
})

ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized() === true) {
    mainWindow?.restore()
  } else {
    mainWindow?.maximize()
  }
})
