module.exports = (req, res, next) => {
  if (req.files.length === 0) { res.status(404).send('No image upload.') }
  next()
}
