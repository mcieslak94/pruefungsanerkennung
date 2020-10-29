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
        let sql = `SELECT profName, titel FROM professor WHERE professorID = ${professorID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getCourseIDbyModule(moduleID, cb) {
      getConnection(function (db) {
        let sql = `SELECT courseID FROM courseXmodule WHERE module_ID = ${moduleID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    deleteCourseXmodule(data, cb) {
      getConnection(function (db) {
        console.log('### course', data.courseID)
        console.log('### module', data.module_ID)
        let sql = `DELETE FROM courseXmodule WHERE courseID = "${data.courseID}" AND module_ID = "${data.module_ID}"`
        console.log('### sql', sql)
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getCasesXModules(caseID, cb) {
      getConnection(function (db) {
        let sql = `SELECT moduleName, moduleID, case_module_ID, requestActive, titel, profName, profEmailadress, cXmhref, begruendung FROM module 
                          LEFT JOIN caseXmodule ON module.moduleID = caseXmodule.module_ID 
                          LEFT JOIN professor ON professor.professorID = module.professorID 
                          WHERE caseID = ${caseID} order by  "moduleName" ASC`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    }
  })
}


module.exports = ModuleDatabase