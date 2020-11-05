const electron = require('electron');

const sqlite = require('sqlite3').verbose();
const DBFile = './db/case.db'
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

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

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
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.