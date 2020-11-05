const sqlite = require('sqlite3').verbose();

const DBFile = './db/case.db'

function getConnection(cb) {
  let db = new sqlite.Database(DBFile, sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    else {
      cb(db)
      console.log('Connected to the case database.');
    }
  });
}

function UniversityDBConnector() {
  return ({
    getExternModules(data, cb) {
      getConnection(function (db) {
        let sql = `SELECT caseFirstName, courseName, universityName, anerkannt, moduleName, extModuleName FROM cases 
        LEFT JOIN course ON cases.extCourseID = course.courseID
                  LEFT JOIN caseXmodule ON cases.caseID = caseXmodule.caseID
                  LEFT JOIN module ON module.moduleID = caseXmodule.module_ID
                  LEFT JOIN university ON cases.universityID = university.universityID 
                  WHERE university.universityID = "${data.universityID}" AND cases.state = "abgeschlossen" order by  "courseName" ASC, "extModuleName" ASC`
        console.log('## sql', sql)
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    },
    getUniversityName(data, cb) {
      getConnection(function (db) {
        let sql = `SELECT * FROM university WHERE universityID = ${data}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    },
    getExtCourses(cb) {
      getConnection(function (db) {
        let sql = `SELECT DISTINCT * FROM Course WHERE intern = "0"`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    }
  })
}


module.exports = UniversityDBConnector