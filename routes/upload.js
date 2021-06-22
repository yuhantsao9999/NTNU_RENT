const express = require('express');
const router = express.Router();
const { multerS3 } = require('../utils/multerS3');
const { rentList } = require('../controller/rentList');
const { comment_publish, comment_rent } = require('../controller/comment');
const imageCheck = require('../middlewares/imageCheck');
const rentCheck = require('../middlewares/rentCheck');

router.post('/rent_upload', [
    multerS3.array('image'),
    imageCheck,
    rentCheck,
    async (req, res) => {
        const result = await rentList(req.files, req.body.data);
        if (result.error) {
            res.status(404).send('Error on mysql.');
        }
        res.send(result.data);
    },
]);

router.post('/comment_publish', async (req, res) => {
    const data = req.body;
    const result = await comment_publish(data);
    if (result.error) {
        res.status(404).send('comment upload error.');
    }
    res.send(result.data);
});

router.post('/comment_rent', async (req, res) => {
    const data = req.body;
    const result = await comment_rent(data);
    if (result.error) {
        res.status(404).send('comment upload error.');
    }
    res.send(result.data);
});

module.exports = router;
