const express = require('express');
const router = express.Router();
const shop = require('../controller/shop');

router.get('/shop', async (req, res) => {
  const min = req.query.min;
  const max = req.query.max;
  const brand = req.query.brand;
  const order = req.query.order;
  const result = await shop(min, max, brand, order);
    if (result.error) {
      res.status(404).send('Product get error.')
    }
    res.render('../public/rent.ejs', result.data);
  })


module.exports = router