const mysql = require('../model/db');

const signIn = async (account) => {
<<<<<<< HEAD
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
=======
	try {
		const {email, password} = account;
  		const sql = 'SELECT * FROM Users WHERE email = ? and password = ?';
  		const result = await mysql.query(sql, [email, password]);
		if (result.length > 0) {
			return result[0]['authority'];
		}
		else {
			throw 'Invalid email/password';
		}
	} 
	catch (err) {
		throw err;
	}
}

const signUp = async (account) => {
	try {
		account['authority'] = 0;
		const sql = 'INSERT INTO Users SET ?';
		await mysql.query(sql, account);
	}
	catch (err) {
		throw err;
	}
}
module.exports = {signIn, signUp}
>>>>>>> c94388b06b458fb2b8cff4acdcd1e4252e8bd13f
