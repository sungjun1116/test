const electron = require("electron");
const { ipcMain } = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// mainWindow(처음 이름과 학번을 치는 창)
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// testWindow(문제를 푸는 창)
let testWindow;
function createTestWindow() {
  testWindow = new BrowserWindow({ width: 800, height: 800 });
  testWindow.loadURL(`file://${__dirname}/src/quiz.html`);
  testWindow.on("closed", function () {
    testWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("test", () => {
  createTestWindow();
  mainWindow.close();
});
