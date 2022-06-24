const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const {errorMapper} = require("../utils/errorMapper");

router.get('/', (req,res) => {
    res.render('publication');
});

router.get('/create', isAuth,(req, res) => {
    res.render('publication/create')
});

router.post('/create', isAuth, async (req, res) => {

    try {
        const publicationData = {...req.body, author: req.user._id};
        const createdPublication = await publicationService.create(publicationData);
        res.redirect('/publications')
    } catch (error) {
        res.render('publication/create', {error: errorMapper(error)});
    }

})


module.exports = router;
