const express = require('express');
const router = express.Router();
const mysql = require('../model/db');
router.get('/contract', async (req, res) => {
    try {
        const qryStr = 'SELECT contract_id, product_id, publish_id, rent_id, c_status FROM Contract';
        const data = await mysql.query(qryStr, []);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/contract/details', async (req, res) => {
    try {
        const contract_id = req.body.contract_id;
        const qryStr = 'SELECT start_date, end_date, publish_star, publish_comment, rent_star, rent_comment FROM Contract AS C LEFT JOIN Eval AS E ON (C.contract_id=E.contract_id) WHERE C.contract_id = ?';
        const data = await mysql.query(qryStr, [contract_id.toString()]);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/contract/terminate', async (req, res) => {
    try {
        const contract_id = req.body.contract_id;
        const qryStr = 'UPDATE Contract SET c_status=\'termination\' WHERE contract_id=?';
        await mysql.query(qryStr, [contract_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
router.post('/contract/delete', async (req, res) => {
    try {
        const contract_id = req.body.contract_id;
        const qryStr = 'DELETE FROM Contract WHERE contract_id=?';
        await mysql.query(qryStr, [contract_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
router.get('/account', async (req, res) => {
    try {
        const qryStr = 'SELECT * FROM Users';
        const data = await mysql.query(qryStr, []);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/account/auth', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const lastAuth = req.body.lastAuth;
        const qryStr = 'UPDATE Users SET authority=? WHERE user_id=?';
        await mysql.query(qryStr, [lastAuth.toString(), user_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
router.post('/account/delete', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const qryStr = 'DELETE FROM Users WHERE user_id=?';
        await mysql.query(qryStr, [user_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
router.get('/product', async (req, res) => {
    try {
        const qryStr = 'SELECT product_id, user_id, category, price, place, rent_times, p_status FROM Product';
        const data = await mysql.query(qryStr, []);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/product/details', async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const qryStr = 'SELECT photo, brand, intro, days FROM Product WHERE product_id=?'
        const data = await mysql.query(qryStr, [product_id.toString()]);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
})
router.post('/product/offshelf', async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const qryStr = 'UPDATE Product SET p_status = \'offshelf\' WHERE product_id=?';
        await mysql.query(qryStr, [product_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
router.post('/product/delete', async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const qryStr = 'DELETE FROM Product WHERE product_id=?';
        await mysql.query(qryStr, [product_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
module.exports = router;