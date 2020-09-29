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

function ModuleDatabase() {
  return ({
    getProfByModule(professorID, cb) {
      getConnection(function (db) {
        let sql = `SELECT profName, profEmailadress, titel FROM professor WHERE professorID = ${professorID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    }
  })
}


module.exports = ModuleDatabase