const {isAuth} = require("../middlewares/authMiddleware");
const cryptoService = require('../services/cryptoService');
const {errorMapper} = require("../utils/errorMapper");
const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('crypto');
});

router.get('/create', isAuth, (req,res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {

    const selectedCryptoMethod = {};
    if (req.body.paymentMethod) {
        console.log(req.body.paymentMethod);
        selectedCryptoMethod[`${req.body.paymentMethod}`] = true;
    }

    try {
        const cryptoData = {...req.body, owner: req.user._id};
        const createdCrypto = await cryptoService.create(cryptoData);
        res.redirect('/crypto')
    } catch (error) {
        res.render('crypto/create', {...req.body, selectedCryptoMethod, error: errorMapper(error)});
    }

});


module.exports = router;
