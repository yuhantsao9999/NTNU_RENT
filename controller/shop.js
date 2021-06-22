const mysql = require('../model/db');

const shop = async (min, max, brand, order) => {

    var query = [];

    if (typeof(min) == "undefined"){
      min = 0;
      max = 4000;
    }
    query.push(min);
    query.push(max);

    var sql = "SELECT Product.product_id AS id, photo, p_name, price, avg(rent_star) AS score "
      + "FROM Product LEFT OUTER JOIN Contract ON Product.product_id = Contract.product_id LEFT OUTER JOIN Eval ON Contract.contract_id = Eval.contract_id "
      + "WHERE price >= ? AND price <= ? AND Product.product_id NOT IN (SELECT DISTINCT C.product_id FROM Contract as C WHERE C.c_status = 'continue') "
    
    if (typeof(brand) != "undefined" && brand.length != 0) {
      sql = sql + 'AND brand = ? ';
      query.push(brand);
    }

    sql = sql + "GROUP BY Product.product_id ";

    if (order == "asc") {
      sql = sql + 'ORDER BY price ASC ';
    } else if (order == "desc") {
      sql = sql + 'ORDER BY price DESC ';
    } else if (order == "hot") {
      sql = sql + 'ORDER BY score DESC ';
    } else if (order == 'new') {
      sql = sql + 'ORDER BY uploaded_date DESC';
    }

    sql = sql + ';';

    const results = await mysql.query(sql, query)
      .catch((err) => {
        console.log(err)
    });
    const data = {
      'product_id': [],
      'photo': [],
      'name': [],
      'price': [],
    }
    if (results.length > 0) {
      for (let result of results) {
        data.product_id.push(result.id);
        data.photo.push(result.photo.split(',')[0]);
        data.name.push(result.p_name);
        data.price.push(result.price);
      }
      return { error: false, data }
    }
    return { error: true }
  }

module.exports = shop;