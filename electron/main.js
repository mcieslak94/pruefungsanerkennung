const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

app.disableHardwareAcceleration();

const sqlite = require('sqlite3').verbose();
const DBFile = process.cwd() + '\\db\\case.db'

let db = new sqlite.Database(DBFile, sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error('####', err.message);
  else {
      console.info(`Connected to ${DBFile} DB`)
      db.run('CREATE TABLE IF NOT EXISTS course(courseID INTEGER PRIMARY KEY AUTOINCREMENT, name STRING)');
      db.run('CREATE TABLE IF NOT EXISTS professor(professorID INTEGER PRIMARY KEY AUTOINCREMENT, firstName STRING, lastName STRING, emailadress STRING)');
      db.run('CREATE TABLE IF NOT EXISTS document(documentID INTEGER PRIMARY KEY AUTOINCREMENT, antrag INTEGER DEFAULT 0, modulhandbuch INTEGER DEFAULT 0, notenspiegel INTEGER DEFAULT 0, caseID INTEGER, FOREIGN KEY (caseID) REFERENCES cases (caseID))');
      db.run('CREATE TABLE IF NOT EXISTS module(moduleID INTEGER PRIMARY KEY AUTOINCREMENT, moduleName TEXT, creditpoints INTEGER, professorID INTEGER, FOREIGN KEY (professorID) REFERENCES professor (professorID))');
      db.run('CREATE TABLE IF NOT EXISTS cases(caseID	INTEGER NOT NULL, courseID INTEGER, universityID INTEGER, caseFirstName TEXT, caseLastName TEXT, mNumber NUMERIC, state TEXT,createDateCase TEXT,email TEXT,geschlecht TEXT,intern	INTEGER DEFAULT 0,otherChecks	INTEGER DEFAULT 0,inGermany	INTEGER DEFAULT 0,docAntrag	INTEGER DEFAULT 0,docHandbuch	INTEGER DEFAULT 0,docNoten	INTEGER DEFAULT 0,PRIMARY KEY(caseID AUTOINCREMENT ),FOREIGN KEY(courseID) REFERENCES course(courseID ), FOREIGN KEY(universityID) REFERENCES university(universityID ))');
      db.run('CREATE TABLE IF NOT EXISTS caseXmodule(case_module_ID INTEGER PRIMARY KEY AUTOINCREMENT, caseID INTEGER, module_ID INTEGER, requestDate INTEGER, requestActive BOOLEAN, FOREIGN KEY(caseID) REFERENCES cases(caseID), FOREIGN KEY(moduleID) REFERENCES module(moduleID))');
      db.run('CREATE TABLE IF NOT EXISTS courseXmodule(course_module_ID INTEGER PRIMARY KEY AUTOINCREMENT, courseID INTEGER, moduleID INTEGER, FOREIGN KEY(courseID) REFERENCES course(courseID), FOREIGN KEY(moduleID) REFERENCES module(moduleID))');
      db.run('CREATE TABLE IF NOT EXISTS templates(templateID INTEGER PRIMARY KEY AUTOINCREMENT, templateText TEXT, templateBetreff TEXT)')
      db.close()
  }
})

let mainWindow;
function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});