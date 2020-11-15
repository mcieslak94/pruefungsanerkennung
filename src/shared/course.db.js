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

function CourseDBConnector() {
  return ({
    getCourses(intern, cb) {
      getConnection(function (db) {
        let sql = ` SELECT * FROM course WHERE intern = "${intern}" ORDER BY "courseName" ASC`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    }
  })
}


module.exports = CourseDBConnector