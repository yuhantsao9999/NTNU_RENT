const mysql = require('../model/db');

const rentProduct = async (email, product_id) => {

    var results = await mysql.query('SELECT user_id FROM Users WHERE email = ?', [email]);
    const rent_id = results[0].user_id;

    results = await mysql.query('SELECT user_id, days FROM Product WHERE product_id = ?', [product_id]);
    const publish_id = results[0].user_id;
    const start_date = new Date(Date.now());
    const end_date = new Date(Date.now() + 86400000 * results[0].days);
    const set = [product_id, publish_id, rent_id, start_date, end_date];
    const sql = 'INSERT INTO Contract(product_id, publish_id, rent_id, start_date, end_date) VALUES(?, ?, ?, ?, ?)';
    const result = await mysql.query(sql, set).catch((err) => {
        console.log(err);
        return false;
    });
    if (result) {
        return { error: false, data: { status: true } };
    }
    return { error: true };
}

module.exports = rentProduct;