const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { IAM_USER_SECRET_ACCESS_KEY, IAM_USER_KEY_ID } = process.env;

aws.config.update({
    secretAccessKey: IAM_USER_SECRET_ACCESS_KEY,
    accessKeyId: IAM_USER_KEY_ID,
    region: 'ap-northeast-1',
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ntnurent',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4));
        },
    }),
});

module.exports = { multerS3: upload };
