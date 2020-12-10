const mysql = require('mysql2')
const { randomStr } = require('./utils/random')
require('dotenv').config()
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
})

const newUser = {
  email: randomStr(),
  password: randomStr(),
  last_name: randomStr(),
  first_name: randomStr(),
}
const sql = 'INSERT INTO member SET ?'

conn.connect()

conn.query(sql, newUser, function (error, results, fields) {
  if (error) console.log(error)
  else { console.log(results) }
})

conn.end()
