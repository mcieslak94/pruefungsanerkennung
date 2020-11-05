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

function DatabaseCase() {
  return ({
    updateCase(caseID, prop, value, cb) {
      getConnection(function (db) {
        let sql = `UPDATE cases SET ${prop} = ${value} WHERE caseID = ${caseID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
        });
      })
    },
    reminderCases(dateString, cb) {
      getConnection(function (db) {
        let sql = `SELECT caseID, caseFirstName, caseLastName, reminderDate FROM cases WHERE reminderDate <= '${dateString}' AND state != 'abgeschlossen';`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    },
    reminderModules(dateString, cb) {
      getConnection(function (db) {
        let sql = `SELECT caseID,  caseFirstName, caseLastName, moduleReminderDate FROM cases WHERE moduleReminderDate <= '${dateString}' AND state != 'abgeschlossen';`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    },
    getActiveCasesAsc(cb) {
      getConnection(function (db) {
        let sql = `SELECT * FROM cases WHERE state != "abgeschlossen" ORDER BY "caseLastName" ASC;`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    },
    getInactiveCasesAsc(cb) {
      getConnection(function (db) {
        let sql = `SELECT * FROM cases WHERE state = "abgeschlossen" ORDER BY "caseLastName" ASC;`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(this.changes)
          cb(rows)
        });
      })
    }
  })
}


module.exports = DatabaseCase