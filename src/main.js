const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const homeOrTmp = require('home-or-tmp')
const path = require('path')
const fs = require('fs-extra-promise')
const co = require('bluebird-co').co
const crypto = require('crypto')

const BASICNOTP_FILEPATH = path.resolve(homeOrTmp, '.basicnotp')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: true,
    alwaysOnTop: true
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  if (process.env.DEVTOOLS) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function pDecrypt (data, secret) {
  data = data.trim()
  var result = ''
  var d = crypto.createDecipher('aes256', secret)
  result += d.update(data, 'base64', 'utf8')
  result += d.final('utf8')
  return result
}

function pEncrypt (data, secret) {
  data = data.trim()
  var result = ''
  var c = crypto.createCipher('aes256', secret)
  result += c.update(data, 'utf8', 'base64')
  result += c.final('base64')
  return result
}

app.persistency = {
  loadKeys: co.wrap(function * (secret) {
    let exists = yield fs.existsAsync(BASICNOTP_FILEPATH)
    if (!exists) {
      return []
    }

    let encrypted = yield fs.readJsonAsync(BASICNOTP_FILEPATH, 'utf8')

    // Throw if invalid secret
    var decrypted = encrypted.map((entry) => {
      return Object.assign({}, entry, {
        key: pDecrypt(entry.key, secret)
      })
    })

    return decrypted
  }),

  saveKeys: co.wrap(function * (keys, secret) {
    let encrypted = keys.map((entry) => {
      return Object.assign({}, entry, {
        key: pEncrypt(entry.key, secret)
      })
    })
    fs.outputFileAsync(BASICNOTP_FILEPATH, JSON.stringify(encrypted, null, 2), 'utf8')
  })
}
