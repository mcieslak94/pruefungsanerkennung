var sqlite = require('sqlite-cipher')
const DBFile = './case.enc'

function CourseDBConnector() {
  return ({
    getCourses(intern, cb) {
        sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
        let sql = ` SELECT * FROM course WHERE intern = "${intern}" ORDER BY "courseName" ASC`
        cb(sqlite.run(sql, []))
    }
  })
}


module.exports = CourseDBConnector