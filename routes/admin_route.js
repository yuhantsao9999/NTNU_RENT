const express = require('express');
const router = express.Router();
const mysql = require('../model/db');
router.get('/contract', async (req, res) => {
    try {
        const qryStr = 'SELECT contract_id, publish_id, rent_id, c_status, start_date, end_date from Contract';
        const data = await mysql.query(qryStr, []);
        console.log(data);
        return res.json({status:'ok', data:data});
    }
    catch (err) {
        console.log(err);
        return res.json({status:'error', data:null});
    }
    res.json({status:'contract', 
    data:[{contract_id:121312, publish_id:02, rent_id:03, c_status:'continue', start_date:'2021-06-06', end_date:'2021-07-01'},
    {contract_id:999999, publish_id:07, rent_id:05, c_status:'continue', start_date:'2021-05-06', end_date:'2021-06-01'},
    {contract_id:777777, publish_id:17, rent_id:25, c_status:'finish', start_date:'2021-03-05', end_date:'2021-08-31'},
    {contract_id:663636, publish_id:03, rent_id:12, c_status:'finish', start_date:'2021-04-07', end_date:'2021-07-03'}
    ]});
});
router.get('/account', (req, res) => {
    res.json({status:'contract'});
});
module.exports = router;