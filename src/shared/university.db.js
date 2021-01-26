var sqlite = require('sqlite-cipher')
const DBFile = './case.enc'

function UniversityDBConnector() {
  return ({
    getExternModules(data, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT caseFirstName, courseName, universityName, anerkannt, moduleName, extModuleName, begruendung FROM cases 
        LEFT JOIN course ON cases.extCourseID = course.courseID
                  LEFT JOIN caseXmodule ON cases.caseID = caseXmodule.case_ID
                  LEFT JOIN module ON module.moduleID = caseXmodule.module_ID
                  LEFT JOIN university ON cases.universityID = university.universityID 
                  WHERE university.universityID = "${data.universityID}" AND cases.state = "abgeschlossen" order by  "courseName" ASC, "extModuleName" ASC`
                  cb(sqlite.run(sql, []))
    },
    getUniversityName(data, cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * FROM university WHERE universityID = ${data}`
        cb(sqlite.run(sql, []))
    },
    getExtCourses(cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT DISTINCT * FROM Course WHERE intern = "0"`
        cb(sqlite.run(sql, []))
    }
  })
}


module.exports = UniversityDBConnector