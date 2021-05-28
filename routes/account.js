const express = require('express')
const router = express.Router()
const { signIn, signUp } = require('../controller/account')

router.post('/signIn', async (req, res) => {
  const data = req.body
  const result = await signIn(data)
  if (result.error) {
    res.status(404).send('Error email or password.')
  }
  res.send(result.data)
})

router.post('/signUp', async (req, res) => {
  const data = req.body
  const result = await signUp(data)
  if (result.error) {
    res.status(404).send('Email has been registered, please use another email.')
  }
  res.send(result.data)
})

module.exports = router
