const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json({ limit: '50000mb' }));
app.use(bodyParser.urlencoded({ limit: '50000mb', extended: true }));

app.use(express.static(path.join(__dirname, '/public'), { index: 'index.html' }));
app.use(express.static(__dirname, { dotfiles: 'allow' }));

const image = require('./routes/image');
app.use('/', image);

const account = require('./routes/account');
const admin = require('./routes/admin_route');
app.use('/', account);
app.use('/admin', admin);
const upload = require('./routes/upload');
app.use('/', upload);

const shop = require('./routes/shop');
app.use('/', shop);

const product = require('./routes/product');
app.use('/', product);

app.get('/lunchBox', (req, res) => {
    res.sendFile(path.join(__dirname, '/lunchbox/build/index.html'));
});

// app.get('/', (req, res) => {
//     res.send('Very ok');
// });

app.listen(3000, () => console.log('伺服器已經啟動在http://localhost:3000/'));
