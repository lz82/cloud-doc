const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
  });

  win.loadURL("http://localhost:3000");
});
