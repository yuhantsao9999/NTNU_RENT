const mysql = require('../db/db')

const getUserRent = async (email) => {
  const sql = 'SELECT * FROM rentlist WHERE email = ?'
  const results = await mysql.query(sql, email)
    .catch((err) => {
      console.log(err)
    })
  const data = []
  if (results.length > 0) {
    for (let result of results) {
      data.push({
        paths: result.path,
        name: result.name,
        amount: result.amount,
        price: result.price,
        long: result.long,
      })
    }
    return { error: false, data }
  }
  return { error: true }
}

const getUserSell = async (email) => {
  const sql = 'SELECT * FROM selllist WHERE email = ?'
  const results = await mysql.query(sql, email)
    .catch((err) => {
      console.log(err)
    })
  const data = []
  if (results.length > 0) {
    for (let result of results) {
      data.push({
        paths: result.path,
        name: result.name,
        amount: result.amount,
        price: result.price,
      })
    }
    return { error: false, data }
  }
  return { error: true }
}

const getAllRent = async () => {
  const sql = 'SELECT * FROM rentlist'
  const results = await mysql.query(sql)
    .catch((err) => {
      console.log(err)
    })
  const data = []
  if (results.length > 0) {
    for (let result of results) {
      data.push({
        paths: result.path,
        name: result.name,
        amount: result.amount,
        price: result.price,
        long: result.long,
      })
    }
    return { error: false, data }
  }
  return { error: true }
}

const getAllSell = async () => {
  const sql = 'SELECT * FROM selllist'
  const results = await mysql.query(sql)
    .catch((err) => {
      console.log(err)
    })
  const data = []
  if (results.length > 0) {
    for (let result of results) {
      data.push({
        paths: result.path,
        name: result.name,
        amount: result.amount,
        price: result.price,
      })
    }
    return { error: false, data }
  }
  return { error: true }
}

module.exports = { getUserRent, getUserSell, getAllSell, getAllRent }
