const express = require('express');
const router = express.Router();
const mysql = require('../model/db');
router.get('/contract', async (req, res) => {
    try {
        const qryStr = 'SELECT contract_id, publish_id, rent_id, c_status FROM Contract';
        const data = await mysql.query(qryStr, []);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/contract/details', async (req, res) => {
    const contract_id = req.body.contract_id;
    try {
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
    const contract_id = req.body.contract_id;
    try {
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
    const contract_id = req.body.contract_id;
    try {
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
        const qryStr = 'SELECT * FROM Users WHERE authority <> 1';
        const data = await mysql.query(qryStr, []);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.post('/account/auth', async (req, res) => {
    const user_id = req.body.user_id;
    const lastAuth = req.body.lastAuth;
    try {
        const qryStr = 'UPDATE Users SET authority=? WHERE user_id=?';
        await mysql.query(qryStr, [lastAuth.toString(), user_id.toString()]);
        return res.json({status:'ok'});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error'});
    }
});
module.exports = router;