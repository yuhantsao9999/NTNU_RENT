const mysql = require('../model/db');

const product = async(product_id) => {
    const sql = 'SELECT * FROM Product WHERE product_id = ?'
    const results = await mysql.query(sql, [product_id])
        .catch((err) => {
            console.log(err)
        })
    const data = {}
    if (results.length > 0){
        for (let result of results){
            data.photo = result.photo.split(',')[0];
            data.name = result.name;
            data.category = result.category;
            data.brand = result.brand;
            data.price = result.price;
            data.rent_times = result.rent_times;
            data.place = result.place;
            data.intro = result.intro;
        }
        return { error: false, data}
    }
    return {error: true }
}

module.exports = product;