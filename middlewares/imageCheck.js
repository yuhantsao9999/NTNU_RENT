module.exports = (req, res, next) => {
  console.log('req.files, req.files')
  if (req.files.length === 0) { res.status(404).send('No image upload.') }
  next()
}
