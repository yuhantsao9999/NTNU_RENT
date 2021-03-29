const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const { IAM_USER_KEY, IAM_USER_SECRET } = process.env

aws.config.update({
  secretAccessKey: IAM_USER_SECRET,
  accessKeyId: IAM_USER_KEY,
  region: 'us-east-1',
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bchenimage',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
    },
  }),
})

module.exports = { multerS3: upload }
