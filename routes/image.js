const express = require('express')
const router = express.Router()
const { getUserRent, getUserSell } = require('../module/image')

router.get('/rent_image', async (req, res) => {
  const email = req.query.email
  const result = await getUserRent(email)
  if (result.error) {
    res.status(404).send('Image get error.')
  }
  res.send(result.data)
})

router.get('/sell_image', async (req, res) => {
  const email = req.query.email
  const result = await getUserSell(email)
  if (result.error) {
    res.status(404).send('Image get error.')
  }
  res.send(result.data)
})

module.exports = router
