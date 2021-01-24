var sqlite = require('sqlite-cipher')
const DBFile = './case.enc'

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
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `UPDATE cases SET ${prop} = ${value} WHERE caseID = ${caseID}`
        cb(sqlite.run(sql, []))
      },
    reminderCases(dateString, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT caseID, caseFirstName, caseLastName, reminderDate FROM cases WHERE reminderDate <= '${dateString}' AND state != 'abgeschlossen' AND state != 'abgebrochen';`
        cb(sqlite.run(sql, []))
      },
    reminderModules(dateString, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT caseID,  caseFirstName, caseLastName, moduleReminderDate FROM cases WHERE moduleReminderDate <= '${dateString}' AND state != 'abgeschlossen' AND state != 'abgebrochen';`
        cb(sqlite.run(sql, []))
      },
    getActiveCasesAsc(cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM cases WHERE state != "abgeschlossen" AND state != "abgebrochen" ORDER BY "caseLastName" ASC;`
        cb(sqlite.run(sql, []))
      },
    getInactiveCasesAsc(cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM cases WHERE state = "abgeschlossen" OR state = "abgebrochen" ORDER BY "caseLastName" ASC;`
        cb(sqlite.run(sql, []))
      },
    getCountByCourseID(courseID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM cases WHERE courseID = '${courseID}'`
        cb(sqlite.run(sql, []))
    }
  })
}


module.exports = DatabaseCase