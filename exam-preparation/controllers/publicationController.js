const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const {errorMapper} = require("../utils/errorMapper");

router.get('/', async (req,res) => {

    const publications = await publicationService.getAll().lean();

    res.render('publication', { publications });

});

router.get('/:publicationId/details', async (req,res) => {

    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    const isAuthor = publication.author._id == req.user?._id;

    res.render('publication/details', { ...publication, isAuthor });

});

router.get('/:publicationId/edit', isAuth, async (req,res, next) => {

    const publication = await publicationService.getOne(req.params.publicationId).lean();

    if (publication.author != req.user._id) {

        return next({message: 'You are not authorised!', status: 401});

    }

    res.render('publication/edit', { ...publication });


});

router.post('/:publicationId/edit', async (req, res, next) => {

    await publicationService.update(req.params.publicationId, req.body);

    res.redirect(`/publications/${req.params.publicationId}/details`);

})

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
