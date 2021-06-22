const mysql = require('../model/db')

const signIn = async (account) => {
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