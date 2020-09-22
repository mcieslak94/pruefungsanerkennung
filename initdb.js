const sqlite = require('sqlite3').verbose();

const DBFile = './db/case.db'

let db = new sqlite.Database(DBFile, sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  else {
    console.log('Connected to the case database.');
    db.run('CREATE TABLE IF NOT EXISTS test(id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING)');
    db.run('CREATE TABLE IF NOT EXISTS course(courseID INTEGER PRIMARY KEY AUTOINCREMENT, name STRING)');
    db.run('CREATE TABLE IF NOT EXISTS module(moduleID INTEGER PRIMARY KEY AUTOINCREMENT, professorID INTEGER, FOREIGN KEY (professorID) REFERENCES professor (professorID)) )');
    db.run('CREATE TABLE IF NOT EXISTS professor(professorID INTEGER PRIMARY KEY AUTOINCREMENT, firstName STRING, lastName STRING, emailadress STRING)');
    db.run('CREATE TABLE IF NOT EXISTS document(documentID INTEGER PRIMARY KEY AUTOINCREMENT, fileName STRING, uploaded INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS case(caseID INTEGER PRIMARY KEY AUTOINCREMENT, courseID INTEGER, documentID INTEGER, firstName String, lastName String, mNumber INTEGER, state STRING, createDate DATE, FOREIGN KEY (courseID) REFERENCES course (courseID)), FOREIGN KEY (documentID) REFERENCES document (documentID)) )');
    db.run('CREATE TABLE IF NOT EXISTS caseXmodule(case_module_ID INTEGER PRIMARY KEY AUTOINCREMENT, caseID INTEGER, moduleID INTEGER, FOREIGN KEY (caseID) REFERENCES case (caseID)), FOREIGN KEY (moduleID) REFERENCES module (moduleID), requestDate Date, requestActive BOOLEAN)');
    db.run('CREATE TABLE IF NOT EXISTS courseXmodule(course_module_ID INTEGER PRIMARY KEY AUTOINCREMENT, courseID INTEGER, moduleID INTEGER, FOREIGN KEY (courseID) REFERENCES course (courseID)), FOREIGN KEY (moduleID) REFERENCES module (moduleID))');

    db.close()
  }
});

  