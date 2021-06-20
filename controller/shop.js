const mysql = require('../model/db');

const shop = async () => {
    const sql = 'SELECT * FROM Product'
    const results = await mysql.query(sql)
      .catch((err) => {
        console.log(err)
      })
      const data = {
        photo: [],
        category: [],
        price: [],
    }
    if (results.length > 0) {
      for (let result of results) {
        data.photo.push(result.photo.split(',')[0]);
        data.category.push(result.category);
        data.price.push(result.price);
      }
      return { error: false, data }
    }
    return { error: true }
  }

const range_shop = async(min, max) => {
    const sql = 'SELECT * FROM Product WHERE price >= ? and price <= ?'
    const results = await mysql.query(sql, [min, max])
      .catch((err) => {
        console.log(err)
      })
    const data = {
        photo: [],
        category: [],
        price: [],
    }
    if (results.length > 0) {
      for (let result of results) {
        data.photo.push(result.photo.split(',')[0]);
        data.category.push(result.category);
        data.price.push(result.price);
      }
      return { error: false, data }
    }
    return { error: true }
}

module.exports =  { shop, range_shop };