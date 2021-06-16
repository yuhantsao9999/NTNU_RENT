const express = require('express')
const router = express.Router()
const { multerS3 } = require('../utils/multerS3')
const { rentList } = require('../controller/rentList')
//const { sellList } = require('../controller/sellList')
const imageCheck = require('../middlewares/imageCheck')
const rentCheck = require('../middlewares/rentCheck')

router.post('/rent_upload', [
  //multerS3.array('image'),
  imageCheck,
  rentCheck,
  async (req, res) => {
    const result = await rentList(req.files, req.body.data)
    if (result.error) {
      res.status(404).send('Error on mysql.')
    }
    res.send(result.data)
  }])

router.post('/sell_upload', [multerS3.array('image'),
  imageCheck,
  rentCheck,
  async (req, res) => {
    const result = await sellList(req.files, req.body.data)
    if (result.error) {
      res.status(404).send('Error on mysql.')
    }
    res.send(result.data)
  }])

module.exports = router
