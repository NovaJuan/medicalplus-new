const electron = require("electron");
const path = require("path");
const { app, BrowserWindow, protocol, dialog } = electron;

let win;

function startup() {
  const registered = protocol.interceptFileProtocol("file", (req, cb) => {
    const filepath = req.url.replace("file://", "").replace(/(%20)+/g, " ");
    console.log(filepath);
    if (req.url.includes("file://media")) {
      cb(path.join(__dirname, filepath));
    } else {
      cb(filepath);
    }
  });

  if (!registered) {
    throw new Error("Failed to register the file protocol.");
  }

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === "production",
    },
  });

  if (process.env.NODE_ENV === "production") {
    win.loadFile("../build/index.html");
  } else {
    win.loadURL("http://localhost:3000");
  }
}

app.whenReady().then(startup);

process.on("unhandledRejection", (err) => {
  dialog.showErrorBox("An error ocurred", err.stack);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  dialog.showErrorBox("An error ocurred", err.stack);
  process.exit(1);
});
