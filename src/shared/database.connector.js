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

function DatabaseConnector(tableName) {
  return ({
    getAll: function (cb) {
      sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
      let sql = `SELECT * From ${tableName}`
        cb(sqlite.run(sql, []))
        sqlite.close()
    },
    data: function (data) {
      return {
        create: function (cb) {
          sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
          let propNames = Object.keys(data).map(prop => prop).join(', ')
          let values = Object.keys(data).map(prop => data[prop])
            cb(sqlite.run(`INSERT INTO ${tableName} (${propNames}) VALUES (${Object.keys(data).map(prop => '?').join(', ')})`, values))
            sqlite.close()
        },
        read: function (cb) {
          sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
          let sql = `SELECT * From ${tableName} WHERE ${Object.keys(data).map(prop => `${prop} = "${data[prop]}"`)}`
          cb(sqlite.all(sql, []))
          sqlite.close()
        },
        update: function (cb) {
          sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
          let update = Object.keys(data.value).map(prop => `${prop} = "${data.value[prop]}"`).join(', ')
          let selector = ''
          if (Object.keys(data.selector).length > 1) selector = Object.keys(data.selector).map(prop => `${prop} = ${data.selector[prop]}`).join(' AND ')
          else selector = Object.keys(data.selector).map(prop => `${prop} = ${data.selector[prop]}`).join(' ')
          cb(sqlite.run(`UPDATE ${tableName} SET ${update} WHERE ${selector}`))
          sqlite.close()
        },
        delete: function (cb) {
          sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
          let sql = `DELETE FROM ${tableName} WHERE ${data.prop} = ${data.value}`
          sqlite.run(sql, [])
          cb(true)
          sqlite.close()
        },
        getAllAsc: function (cb) {
          sqlite.connect(DBFile, 'superPassword123', 'aes-256-ctr');
          let sql = `SELECT * From ${tableName} order by ${data.criteria} ASC`
          cb(sqlite.run(sql, []))
          sqlite.close()
        }
      }
    }
  })
}


module.exports = DatabaseConnector