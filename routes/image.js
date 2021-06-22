const express = require('express');
const router = express.Router();
const {
    getUserRent,
    getUserRentBack,
    getUserWaitRent,
    updateContractStatus,
    getFinishRent,
    getFinishRentBack,
} = require('../controller/image');

//  待出租的東西
router.get('/wait_rent_image', async (req, res) => {
    const email = req.query.email;
    const result = await getUserWaitRent(email);
    console.log(result);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

//已出租的東西
router.get('/rent_image', async (req, res) => {
    const email = req.query.email;
    const result = await getUserRent(email);
    console.log(result);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

router.get('/rent_finish_image', async (req, res) => {
    const email = req.query.email;
    const result = await getFinishRent(email);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

//租借回來的東西
router.get('/rent_back_image', async (req, res) => {
    const email = req.query.email;
    const result = await getUserRentBack(email);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

router.get('/rent_finish_back_image', async (req, res) => {
    const email = req.query.email;
    const result = await getFinishRentBack(email);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

//租借狀態已完成
router.get('/finish_status', async (req, res) => {
    const contract_id = req.query.contract_id;
    const result = await updateContractStatus(contract_id);
    if (result.error) {
        res.status(404).send('update status error.');
    }
    res.send(result.data);
});
module.exports = router;
