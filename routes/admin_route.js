const express = require('express');
const router = express.Router();
const mysql = require('../model/db');
router.get('/contract', async (req, res) => {
    try {
        const qryStr = 'SELECT contract_id, publish_id, rent_id, c_status FROM Contract';
        const data = await mysql.query(qryStr, []);
        // console.log(data);
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
        const qryStr = 'SELECT start_date, end_date, publish_eval, rent_eval FROM Contract WHERE contract_id = ?';
        const data = await mysql.query(qryStr, [contract_id.toString()]);
        // console.log(data);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
});
router.get('/account', (req, res) => {
    res.json({status:'contract'});
});
module.exports = router;