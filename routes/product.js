const express = require('express');
const router = express.Router();
const product = require('../controller/product');
const rentProduct = require('../controller/rentProduct');

router.get('/product', async (req, res) => {
    const product_id = req.query.product_id;
    const result = await product(product_id);
    if (result.error) {
        res.status(404).send('Product get error.')
    }
    res.render('../public/product.ejs', result.data);
})

router.post('/rent_product', async (req, res) =>{
    const email = req.body.email;
    const product_id = req.body.product_id;
    const result = await rentProduct(email, product_id);
    if (result.error) {
        res.status(404).send('Error on mysql,');
    }
    res.send(result.data);
})

module.exports = router