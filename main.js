const { app, BrowserWindow } = require('electron')

var electron_1 = require("electron");

var appmenu = require('./menu.js');
var menu = appmenu.ApplicationMenu;

let win;

function registerShortCuts() {
  electron_1.globalShortcut.unregisterAll();
  electron_1.globalShortcut.register("Ctrl+B", function () {
    win.webContents.send('process-bifurcation', 'bifurcation');
  });
}

function createWindow() {
  registerShortCuts();
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  });

  menu.items[0]['submenu'].items[0].click = function () {
    console.log('sending goto-bifurcation event');
    win.webContents.send('process-bifurcation', 'bifurcation');
  };

  win.loadURL(`file://${__dirname}/dist/index.html`)




  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
