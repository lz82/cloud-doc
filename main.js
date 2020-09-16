const { app, BrowserWindow, Menu } = require('electron');

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const menuTemplate = require('./menu-template');

app.on('ready', async () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  await installExtension(REACT_DEVELOPER_TOOLS);

  win.loadURL('http://localhost:8888');

  // 设置菜单
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
});
