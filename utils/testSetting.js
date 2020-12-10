const mysql = require('../db/db')
const { randomStr } = require('../utils/random')

const teardown = async (email) => {
  const sqlMember = `DELETE FROM member WHERE email = ?`
  const sqlSellList = `DELETE FROM selllist WHERE email = ?`
  const sqlRentList = `DELETE FROM rentlist WHERE email = ?`
  await mysql.query(sqlSellList, email)
    .catch((err) => {
      console.log(err)
    })
  await mysql.query(sqlRentList, email)
    .catch((err) => {
      console.log(err)
    })
  await mysql.query(sqlMember, email)
    .catch((err) => {
      console.log(err)
    })
}

const setUp = async (email) => {
  const member = {
    email: email,
    password: randomStr(),
    first_name: randomStr(),
    last_name: randomStr(),
  }
  const sqlMember = 'INSERT INTO member SET ?'
  await mysql.query(sqlMember, member)
    .catch((err) => {
      console.log(err)
      return false
    })

  const rent = {
    name: randomStr(),
    price: 0,
    amount: 0,
    email: email,
    path: randomStr(),
    long: 0,
    main_category: randomStr(),
    second_category: randomStr(),
  }
  const sqlRent = 'INSERT INTO rentlist SET ?'
  await mysql.query(sqlRent, rent)
    .catch((err) => {
      console.log(err)
      return false
    })

  const sell = {
    name: randomStr(),
    price: 0,
    amount: 0,
    email: email,
    path: randomStr(),
    main_category: randomStr(),
    second_category: randomStr(),
  }
  const sqlSell = 'INSERT INTO selllist SET ?'
  await mysql.query(sqlSell, sell)
    .catch((err) => {
      console.log(err)
      return false
    })
}

module.exports = { teardown, setUp }
