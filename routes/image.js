const express = require('express');
const router = express.Router();
const { getUserRent, getAllRent } = require('../controller/image');

router.get('/rent_image_all', async (req, res) => {
    const result = await getAllRent();
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

router.get('/rent_image', async (req, res) => {
    const email = req.query.email;
    const result = await getUserRent(email);
    if (result.error) {
        res.status(404).send('Image get error.');
    }
    res.send(result.data);
});

module.exports = router;
