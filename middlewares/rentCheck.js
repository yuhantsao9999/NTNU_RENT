module.exports = (req, res, next) => {
  const data = JSON.parse(req.body.data)
  console.log('data[key]',data)
  for (let key in data) {
    if (data[key].length === 0) { res.status(404).send('Input value is empty.') }
  }
  next()
}
