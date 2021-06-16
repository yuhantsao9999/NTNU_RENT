const mysql = require('../model/db');
const { findPath } = require('../utils/image');

const sellList = async (files, data) => {
    const paths = findPath(files);
    const set = {
        ...JSON.parse(data),
        path: paths.toString(),
    };
    const sql = 'INSERT INTO selllist SET ?';
    const result = await mysql.query(sql, set).catch((err) => {
        console.log(err);
        return false;
    });
    if (result) {
        return { error: false, data: { status: true } };
    }
    return { error: true };
};

module.exports = { sellList };
