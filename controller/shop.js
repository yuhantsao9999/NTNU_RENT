const mysql = require('../model/db');

const shop = async (min, max, brand, order) => {

    var query = [];

    if (typeof(min) == "undefined"){
      min = 0;
      max = 4000;
    }
    query.push(min);
    query.push(max);

    var sql = "select Product.product_id as id, photo, p_name, price, avg(rent_star) as score "
      + "from product left outer join contract on product.product_id = contract.product_id left outer join eval on contract.contract_id = eval.contract_id "
      + "where price >= ? and price <= ? and Product.product_id not in  (select distinct C.product_id from contract as C where C.c_status = 'continue') "
    
    if (typeof(brand) != "undefined" && brand.length != 0) {
      sql = sql + 'and brand = ? ';
      query.push(brand);
    }

    sql = sql + "group by Product.product_id ";

    if (order == "asc") {
      sql = sql + 'order by price asc ';
    } else if (order == "desc") {
      sql = sql + 'order by price desc ';
    } else if (order == "hot") {
      sql = sql + 'order by score desc ';
    } else if (order == 'new') {
      sql = sql + 'order by uploaded_date desc';
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
      console.log("Controller: ", data, sql, query, brand);
      return { error: false, data }
    }
    return { error: true }
  }

module.exports = shop;