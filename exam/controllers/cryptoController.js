const {isAuth} = require("../middlewares/authMiddleware");
const cryptoService = require('../services/cryptoService');
const {errorMapper} = require("../utils/errorMapper");
const router = require('express').Router();

router.get('/', async (req,res) => {

    try {
        const cryptos = await cryptoService.getAll().lean();

        res.render('crypto', {cryptos});

    } catch (error) {

        res.render('crypto', { error: errorMapper(error)});
    }

});

router.get('/:cryptoId/details', async (req,res) => {

    try {
        const crypto = await cryptoService.getOneDetailed(req.params.cryptoId).lean();
        const isOwner = crypto.owner._id == req.user?._id;
        const isPurchased = crypto.cryptoUsers.join(',').includes(req.user?._id);
        res.render('crypto/details', {...crypto, isOwner, isPurchased});
    } catch (error) {

        res.render('crypto/details', {error: errorMapper(error)});

    }

});

router.get('/:cryptoId/edit',  (req,res) => {



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
