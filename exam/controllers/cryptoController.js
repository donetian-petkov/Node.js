const {isAuth} = require("../middlewares/authMiddleware");
const cryptoService = require('../services/cryptoService');
const {errorMapper} = require("../utils/errorMapper");
const {preloadCrypto, isOwner} = require("../middlewares/cryptoMiddlewares");
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
        const crypto = await cryptoService.getOne(req.params.cryptoId).lean();
        const isOwner = crypto.owner._id == req.user?._id;
        const isPurchased = crypto.cryptoUsers.join(',').includes(req.user?._id);

        res.render('crypto/details', {...crypto, isOwner, isPurchased});
    } catch (error) {

        res.render('crypto/details', {error: errorMapper(error)});

    }

});

router.get('/:cryptoId/edit', isAuth, preloadCrypto, isOwner, (req,res, next) => {


    const selectedCryptoMethod = {};
    selectedCryptoMethod[`${req.body.paymentMethod}`] = true;

        res.render('crypto/edit', {...req.crypto, selectedCryptoMethod});

});

router.post('/:cryptoId/edit', isAuth, preloadCrypto, isOwner, async (req,res, next) => {

    try {

        await cryptoService.update(req.params.cryptoId, req.body);

        res.redirect(`/crypto/${req.params.cryptoId}/details`);

    } catch (error) {

        res.render('crypto/edit', {...req.body, error: errorMapper(error)});

    }


});

router.get('/:cryptoId/delete', isAuth, preloadCrypto, isOwner, async (req, res) => {

    try {
        await cryptoService.delete(req.params.cryptoId);

        res.redirect('/crypto');
    } catch (error) {

        res.render('crypto', {...req.body, error: errorMapper(error)});

    }

});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {

    try {
        const crypto = await cryptoService.getOne(req.params.cryptoId);

        if (crypto.owner != req.user._id) {

            crypto.cryptoUsers.push(req.user._id);

            await crypto.save();

            res.redirect(`/crypto/${req.params.cryptoId}/details`);

        }

    } catch (error) {

        res.render('crypto/details', {...req.body, error: errorMapper(error)});

    }

});


router.get('/create', isAuth, (req,res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {

    const selectedCryptoMethod = {};
    if (req.body.paymentMethod) {
        selectedCryptoMethod[`${req.body.paymentMethod}`] = true;
    }

    try {
        const cryptoData = {...req.body, owner: req.user._id};
        await cryptoService.create(cryptoData);
        res.redirect('/crypto')
    } catch (error) {
        res.render('crypto/create', {...req.body, selectedCryptoMethod, error: errorMapper(error)});
    }

});

router.get('/search', async (req,res) => {

    try {
        const cryptos = await cryptoService.getAll().lean();

        res.render('crypto/search', {cryptos});

    } catch (error) {

        res.render('crypto/search', {...req.body, error: errorMapper(error)});

    }


});

router.post('/search', async (req,res) => {

    try {

        const {name, paymentMethod} = req.body;

        const cryptos = await cryptoService.search(name,paymentMethod).lean();

        res.render('crypto/search', {cryptos});

    } catch (error) {

        res.render('crypto/search', {...req.body, error: errorMapper(error)});

    }


})


module.exports = router;
