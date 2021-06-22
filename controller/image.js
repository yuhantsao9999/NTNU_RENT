const mysql = require('../model/db');

const getUserWaitRent = async (email) => {
    const sql =
        "SELECT p_name,photo,brand,price,days FROM Product NATURAL JOIN Users WHERE email=? AND product_id NOT IN (SELECT product_id FROM Contract WHERE c_status <> 'continue') ";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getUserRent = async (email) => {
    const sql =
        "SELECT C.contract_id, Product.photo, Product.p_name, Product.brand, Product.price, C.start_date, C.end_date, Product.days, R.name FROM Contract AS C JOIN Users AS P ON C.publish_id = P.user_id JOIN Users AS R ON C.rent_id = R.user_id JOIN Product ON C.product_id = Product.product_id WHERE C.c_status = 'continue' AND P.email = ?";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                whoRent: result.name,
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getFinishRent = async (email) => {
    const sql =
        "SELECT P.p_name, P.photo, C.contract_id, R.name FROM Contract AS C LEFT OUTER JOIN Eval AS E ON C.contract_id = E.contract_id JOIN Users AS U ON C.publish_id = U.user_id JOIN Users AS R ON C.rent_id = R.user_id  JOIN Product AS P on C.product_id = P.product_id WHERE C.c_status = 'finish' AND E.publish_comment = NULL AND U.email = ?";
    // 'SELECT C.contract_id, Product.photo, Product.p_name, Product.brand, Product.price, C.start_date, C.end_date, Product.days, R.name FROM Contract AS C JOIN Users AS P ON C.publish_id = P.user_id JOIN Users AS R ON C.rent_id = R.user_id JOIN Product ON C.product_id = Product.product_id WHERE C.c_status = "finish" AND P.email = ? AND C.contract_id NOT IN (SELECT contract_id FROM Eval)';
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.name,
                // whoRent: result.name,
                // brand: result.brand,s
                // price: result.price,
                // end_date: result.end_date,
                // long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const getUserRentBack = async (email) => {
    const sql =
        "SELECT contract_id,p_name,photo,brand,price,end_date,days FROM Contract NATURAL JOIN Product WHERE rent_id=(SELECT user_id FROM Users WHERE email=?) AND c_status='continue' AND contract_id NOT IN (SELECT contract_id FROM Eval)";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
                brand: result.brand,
                price: result.price,
                end_date: result.end_date,
                long: result.days,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};
const getFinishRentBack = async (email) => {
    const sql =
        "SELECT P.p_name, P.photo, C.contract_id FROM Contract AS C LEFT OUTER JOIN Eval AS E ON C.contract_id = E.contract_id JOIN Users AS U ON C.rent_id = U.user_id JOIN Product AS P on C.product_id = P.product_id WHERE C.c_status = 'finish' AND E.rent_comment = NULL AND U.email = ?";
    const results = await mysql.query(sql, email).catch((err) => {
        console.log(err);
    });
    const data = [];
    if (results.length > 0) {
        for (let result of results) {
            data.push({
                contract_id: result.contract_id,
                paths: result.photo,
                name: result.p_name,
            });
        }
        return { error: false, data };
    }
    return { error: true };
};

const updateContractStatus = async (contract_id) => {
    const sql = "UPDATE Contract SET c_status = 'finish' WHERE contract_id= ?";
    const results = await mysql.query(sql, contract_id).catch((err) => {
        console.log(err);
    });
    if (results) {
        return { error: false, data: { status: true } };
    }
    return { error: true };
};

module.exports = {
    getUserWaitRent,
    getUserRent,
    getUserRentBack,
    updateContractStatus,
    getFinishRent,
    getFinishRentBack,
};
