const mysql = require('../model/db');

const comment_publish = async (data) => {
    const { contract_id, star_number, comment_textarea } = data;

    console.log('data', data);
    const sql = `INSERT Eval (contract_id, publish_star, publish_comment) VALUES (${contract_id},${star_number},${comment_textarea}) ON DUPLICATE KEY UPDATE publish_star = ${star_number}, publish_comment = ${comment_textarea}`;

    const result = await mysql.query(sql).catch((err) => {
        return false;
    });
    if (result) {
        return { error: false };
    }
    return { error: true };
};

const comment_rent = async (data) => {
    const { contract_id, star_number, comment_textarea } = data;

    console.log('data', data);
    const sql = `INSERT Eval (contract_id, rent_star, rent_comment) VALUES (${contract_id},${star_number},${comment_textarea}) ON DUPLICATE KEY UPDATE rent_star = ${star_number}, rent_comment = ${comment_textarea}`;

    const result = await mysql.query(sql).catch((err) => {
        return false;
    });
    if (result) {
        return { error: false };
    }
    return { error: true };
};

module.exports = { comment_publish, comment_rent };
