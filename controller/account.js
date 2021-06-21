const mysql = require('../model/db');

const signIn = async (account) => {
    const { email, password } = account;
    const sql = 'SELECT * FROM member WHERE email = ? and password = ?;';
    const result = await mysql.query(sql, [email, password]).catch((err) => {
        console.log(err);
    });
    if (result.length > 0) {
        const data = {
            last_name: result[0].last_name,
            first_name: result[0].first_name,
            email: result[0].email,
        };
        return { error: false, data };
    }
    return { error: true };
};

const signUp = async (account) => {
    const sql = 'INSERT INTO member SET ?';
    const result = await mysql.query(sql, account).catch((err) => {
        console.log(err);
        return false;
    });
    if (result) {
        const data = {
            last_name: account.last_name,
            first_name: account.first_name,
            email: account.email,
        };
        return { error: false, data };
    }
    return { error: true };
};

module.exports = { signIn, signUp };
