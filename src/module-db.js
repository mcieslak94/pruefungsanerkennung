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

function DatabaseModule() {
  return ({
    getProfForModule(professorID, cb) {
      getConnection(function (db) {
        console.log(caseID, prop, value)
        let sql = `SELECT profLastName FROM professor WHERE professorID = ${professorID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
        });
      })
    }
  })
}


module.exports = DatabaseModule