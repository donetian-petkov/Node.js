const router = require('express').Router();

const Accessory = require('../models/Accessory');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req,res) => {

    Accessory.create(req.body);

     res.redirect('/');
})

module.exports = router;

