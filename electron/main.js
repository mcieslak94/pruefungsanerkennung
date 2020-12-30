const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

app.disableHardwareAcceleration();

const sqlite = require('sqlite3').verbose();
const DBFile = process.cwd() + '\\case.db'

let db = new sqlite.Database(DBFile, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
  console.info('#### Init DB')
  if (err) console.error('####', err.message);
  else {
      console.info(`Connected to ${DBFile} DB`)
      db.run('CREATE TABLE IF NOT EXISTS university ( universityID 	INTEGER PRIMARY KEY AUTOINCREMENT, universityName 	TEXT)');
      db.run('CREATE TABLE IF NOT EXISTS professor ( professorID INTEGER PRIMARY KEY AUTOINCREMENT, profName TEXT, profEmailadress TEXT, titel TEXT)');
      db.run('CREATE TABLE IF NOT EXISTS course(courseID INTEGER PRIMARY KEY AUTOINCREMENT, courseName TEXT, intern INTEGER DEFAULT 0)');
      db.run('CREATE TABLE IF NOT EXISTS module( moduleID INTEGER PRIMARY KEY AUTOINCREMENT, moduleName TEXT, creditpoints 	INTEGER, professorID 	INTEGER,FOREIGN KEY( professorID ) REFERENCES  professor ( professorID ))');
      db.run('CREATE TABLE IF NOT EXISTS cases  (caseID INTEGER	PRIMARY KEY AUTOINCREMENT,courseID 	INTEGER,universityID 	INTEGER,extCourseID 	INTEGER,caseFirstName 	TEXT,caseLastName 	TEXT,mNumber 	NUMERIC,state 	TEXT,	 createDateCase 	INTEGER, 	 email 	TEXT,	 geschlecht 	TEXT,	 universityCheck INTEGER DEFAULT 0, docAntrag INTEGER DEFAULT 0, docHandbuch INTEGER DEFAULT 0,	 docNoten 	INTEGER DEFAULT 0,	 reminderDate 	INTEGER,	 moduleReminderDate 	INTEGER,	FOREIGN KEY( extCourseID ) REFERENCES  course ( courseID ),	FOREIGN KEY( universityID ) REFERENCES  university ( universityID ),	FOREIGN KEY( courseID ) REFERENCES  course ( courseID ))');
      db.run('CREATE TABLE IF NOT EXISTS caseXmodule (case_module_ID INTEGER PRIMARY KEY AUTOINCREMENT, caseID	INTEGER, module_ID 	INTEGER, requestDate INTEGER, requestActive BOOLEAN, begruendung TEXT, anerkannt INTEGER, extModuleName 	TEXT, FOREIGN KEY( module_ID ) REFERENCES module ( moduleID ),FOREIGN KEY( caseID ) REFERENCES cases ( caseID ))');
      db.run('CREATE TABLE IF NOT EXISTS courseXmodule  (course_module_ID INTEGER PRIMARY KEY AUTOINCREMENT,courseID 	INTEGER,module_ID 	INTEGER,FOREIGN KEY( module_ID ) REFERENCES  module ( moduleID ),FOREIGN KEY( courseID ) REFERENCES  course ( courseID ))')
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