const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const {errorMapper} = require("../utils/errorMapper");
const { preloadPublication, isAuthor } = require('../middlewares/publicationMiddlewares')
const mongoose = require("mongoose");

router.get('/', async (req,res) => {

    const publications = await publicationService.getAll().lean();

    res.render('publication', { publications });

});

router.get('/:publicationId/details', async (req,res) => {

    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    const isAuthor = publication.author._id == req.user?._id;
    const isShared = publication.usersShared.join(',').includes(req.user._id);

    res.render('publication/details', { ...publication, isAuthor, isShared });

});

router.get('/:publicationId/edit', isAuth, preloadPublication, isAuthor, async (req,res, next) => {

    console.log(req.publication);

    res.render('publication/edit', { ...req.publication });

});

router.post('/:publicationId/edit', isAuth, preloadPublication, isAuthor, async (req, res, next) => {

    try {
        await publicationService.update(req.params.publicationId, req.body);

        res.redirect(`/publications/${req.params.publicationId}/details`);
    } catch (err) {
        res.render('publication/edit', {...req.body, error: errorMapper(err)});
    }

});

router.post('/:publicationId/delete', isAuth, preloadPublication, isAuthor, async (req, res) => {

    await publicationService.delete(req.params.publicationId);

    res.render('publication');


});

router.get('/:publicationId/share', isAuth, async (req, res) => {

    const publication = await publicationService.getOne(req.params.publicationId);

    publication.usersShared.push(req.user._id);

    await publication.save();

    res.redirect('/');

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
        res.render('publication/create', {...req.body, error: errorMapper(error)});
    }

});


module.exports = router;
