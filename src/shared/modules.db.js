const sqlite = require('sqlite3').verbose();

const DBFile = './case.db'

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
        let sql = `DELETE FROM courseXmodule WHERE courseID = "${data.courseID}" AND module_ID = "${data.module_ID}"`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getCasesXModules(caseID, cb) {
      getConnection(function (db) {
        let sql = `SELECT moduleName, extModuleName, caseID, requestDate, anerkannt, moduleID, case_module_ID, requestActive, titel, profName, profEmailadress, cXmhref, begruendung FROM module 
                          LEFT JOIN caseXmodule ON module.moduleID = caseXmodule.module_ID 
                          LEFT JOIN professor ON professor.professorID = module.professorID 
                          WHERE caseID = ${caseID} order by  "moduleName" ASC`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getDataByModule(moduleID, cb) {
      getConnection(function (db) {
        let sql = `SELECT moduleName, titel, profName, profEmailadress FROM module 
                          LEFT JOIN professor ON professor.professorID = module.professorID 
                          WHERE moduleID = ${moduleID}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getModulesByCourse(courseID, cb) {
      getConnection(function (db) {
        let sql = `SELECT moduleName, moduleID FROM module 
                    LEFT JOIN courseXmodule ON module.moduleID = courseXmodule.module_ID 
                    WHERE courseXmodule.courseID = ${courseID} order by  "courseName" ASC`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    },
    getModuleID(data, cb) {
      getConnection(function (db) {
        let sql = `SELECT moduleID FROM module 
                    WHERE moduleName = '${data.moduleName}' AND professorID = '${data.professorID}' AND creditpoints = '${data.creditpoints}'`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
        });
      })
    }
  })
}


module.exports = ModuleDatabase