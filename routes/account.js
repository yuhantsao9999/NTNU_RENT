const express = require('express');
const router = express.Router();
const { signIn, signUp } = require('../controller/account');

router.post('/signIn', async (req, res) => {
    try {
        const data = req.body;
        const { name, authority } = await signIn(data);
        return res.json({ ok: true, name: name, authority: authority });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ ok: false, error: 'Error email or password.' });
    }
});

router.post('/signUp', async (req, res) => {
    try {
        const data = req.body;
        await signUp(data);
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
        res.status(404).json({ ok: false, error: 'Email/Phone has been registered' });
    }
});

module.exports = router;
