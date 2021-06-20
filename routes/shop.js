const express = require('express');
const router = express.Router();
const { shop, range_shop } = require('../controller/shop');

router.get('/shop', async (req, res) => {
    const result = await shop()
    if (result.error) {
      res.status(404).send('Product get error.')
    }
    res.render('../public/rent.ejs', result.data);
  })

router.get('/shop_price_range', async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;
    const result = await range_shop(min, max);
    if (result.error) {
        res.status(404).send('Product get error.')
    }
    res.render('../public/rent.ejs', result.data);
})

module.exports = router