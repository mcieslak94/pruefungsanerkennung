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
        let sql = ` SELECT moduleNameExt, courseNameExt, anerkannt, moduleName From module 
                    LEFT JOIN moduleXuniversity ON module.moduleID = moduleXuniversity.moduleID 
                    LEFT JOIN university ON university.universityID = moduleXuniversity.universityID 
                    WHERE moduleXuniversity.universityID = ${data.universityID} order by  "courseNameExt" ASC, "moduleNameExt" ASC`
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
        let sql = `SELECT DISTINCT courseNameExt FROM university`
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