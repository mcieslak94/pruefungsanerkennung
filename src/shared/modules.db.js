var sqlite = require('sqlite-cipher')
const DBFile = './case.enc'

function ModuleDatabase() {
  return ({
    getProfByModule(professorID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT profName, titel FROM professor WHERE professorID = ${professorID}`
        cb(sqlite.run(sql, []))
      sqlite.close()
    },
    getCourseIDbyModule(moduleID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT courseID FROM courseXmodule WHERE module_ID = ${moduleID}`
        cb(sqlite.run(sql, []))
        sqlite.close()
    },
    deleteCourseXmodule(data, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `DELETE FROM courseXmodule WHERE courseID = "${data.courseID}" AND module_ID = "${data.module_ID}"`
      cb(sqlite.run(sql, []))
      sqlite.close()
    },
    getCasesXModules2(caseID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM caseXmodule where case_ID = '${caseID}' `
      cb(sqlite.run(sql, []))
      sqlite.close()
      },
    getCasesXModules(caseID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT moduleName, extModuleName, case_ID, caseID, geschlecht, caseLastName, anerkannt, moduleID, case_module_ID, 
                  requestActive, titel, profFirstName, profName, profEmailadress, begruendung FROM module 
                  LEFT JOIN caseXmodule ON module.moduleID = caseXmodule.module_ID 
                  LEFT JOIN professor ON professor.professorID = module.professorID 
                  LEFT JOIN cases ON caseXmodule.case_ID = cases.caseID 
                  WHERE case_ID = '${caseID}' order by "moduleName" ASC`
      let data = sqlite.run(sql)
      cb(data)
      sqlite.close()
      },
    getDataByModule(moduleID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT moduleName, titel, profName, profEmailadress FROM module 
                          LEFT JOIN professor ON professor.professorID = module.professorID 
                          WHERE moduleID = ${moduleID}`
      cb(sqlite.run(sql, []))
      sqlite.close()
      },
    getModulesByCourse(courseID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT moduleName, moduleID FROM module 
                    LEFT JOIN courseXmodule ON module.moduleID = courseXmodule.module_ID 
                    WHERE courseXmodule.courseID = ${courseID} order by  "courseName" ASC`
      cb(sqlite.run(sql, []))
      sqlite.close()
      },
    getModuleID(data, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT moduleID FROM module 
                    WHERE moduleName = '${data.moduleName}' AND professorID = '${data.professorID}' AND creditpoints = '${data.creditpoints}'`
      cb(sqlite.run(sql, []))
      sqlite.close()
      },
    getCountByProfID(profID, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM module WHERE professorID = '${profID}'`
      cb(sqlite.run(sql, []))
      sqlite.close()
    }
  })
}


module.exports = ModuleDatabase