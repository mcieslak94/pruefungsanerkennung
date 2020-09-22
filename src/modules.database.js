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

function ModulesDatabase() {
    return ({
      getModulesByCourse(courseID, cb) {
        getConnection(function (db) {
          let sql = `courseName, profFirstName, profLastName From module 
                        LEFT JOIN courseXmodule ON module.moduleID = courseXmodule.moduleID 
                        LEFT JOIN professor ON module.professorID = professor.professorID
                        LEFT JOIN course ON courseXmodule.courseID = course.courseID
                        WHERE course.courseID = ${courseID}`
          db.all(sql, [], (err, rows) => {
            if (err) throw err;
            cb(rows)
          });
        })
      }
    })
  }

  module.exports = ModulesDatabase