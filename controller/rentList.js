const mysql = require('../model/db');
const { findPath } = require('../utils/image');

const rentList = async (files, data) => {
    const paths = findPath(files);
    const re = /"/gi
    const set = Array.from(data.substring(1, data.length - 1).replace(re, '').split(',')).concat([paths.toString()]);
    const user_id = await mysql.query('SELECT user_id from Users where email = ?', set[0]).catch((err) => {
        console.log(err);
        return false;
    })

    set.splice(0, 1);
    set.unshift(user_id[0].user_id);

    const sql = 'INSERT INTO Product(user_id, category, brand, price, days, intro, place, photo) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await mysql.query(sql, set).catch((err) => {
        console.log(err);
        return false;
    });
    if (result) {
        return { error: false, data: { status: true } };
    }
    return { error: true };
};

module.exports = { rentList };