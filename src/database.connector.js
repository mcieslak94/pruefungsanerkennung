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

function DatabaseConnector(tableName) {
  return ({
    getAll: function(cb){
      getConnection(function (db) {
        let sql = `SELECT * From ${tableName}`
        db.all(sql, [], (err, rows) => {
          if (err) throw err;
          cb(rows)
          db.close()
        });
      })
    },
    data: function(data){
      return {
        create: function(cb){
          getConnection(function (db) {
            console.log(data)
            let propNames = Object.keys(data).map(prop => prop).join(', ')
            let values = Object.keys(data).map(prop => data[prop])
            db.run(`INSERT INTO ${tableName} (${propNames}) VALUES (${Object.keys(data).map(prop => '?').join(', ')})`, values, function(err, row) {
              if (err) throw err;
              cb()
              db.close()
            });
          })
        },
        read: function(cb){
          getConnection(function (db) {
            let sql = `SELECT * From ${tableName} WHERE ${Object.keys(data).map(prop => `${prop} = "${data[prop]}"`)}`
            db.all(sql, [], (err, rows) => {
              if (err) throw err;
              cb(rows)
              db.close()
            });
          })
        },
        update: function(cb){
          getConnection(function (db) {
          console.log(data)
          let update = Object.keys(data.value).map(prop => `${prop} = "${data.value[prop]}"`).join(', ')
          let selector = ''
          if (Object.keys(data.selector).length > 1) selector = Object.keys(data.selector).map(prop => `${prop} = ${data.selector[prop]}`).join(' AND ')
          else selector = Object.keys(data.selector).map(prop => `${prop} = ${data.selector[prop]}`).join(' ')
            db.run(`UPDATE ${tableName} SET ${update} WHERE ${selector}`, function(err) {
              console.log('UPDATED ', selector)
              if (err) throw err;
              cb(this.changes)
              db.close()
            });
          })
        },
        delete: function(cb){
          getConnection(function (db) {
            let sql = `DELETE FROM ${tableName} WHERE ${data.prop} = ${data.value}`
            db.all(sql, [], (err ) => {
              if (err) throw err;
              cb(true)
              db.close()
            });
          })
        },
        getAllAsc: function(cb){
          getConnection(function (db) {
            let sql = `SELECT * From ${tableName} order by ${data.criteria} ASC`
            db.all(sql, [], (err, rows) => {
              if (err) throw err;
              cb(rows)
              db.close()
            });
          })
        }
      }
    } 
  })
}


module.exports = DatabaseConnector