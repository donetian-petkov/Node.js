const router = require('express').Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, (req, res) => {
    const cube = req.body;
    cube.owner = req.user._id;

    // Validation
    if (cube.name.length < 2) {
       return res.status(400).send('Invalid request');

    }

    //Saves data:
    cubeService.create(cube)
        .then(() => {
            // Redirect to page:
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.get('/:id', async (req, res) => {

    const cube = await cubeService.getOneDetails(req.params.id).lean();

    const isOwner = cube.owner == req.user?._id;

    res.render('details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render('attachAccessory', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', async (req,res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/${req.params.cubeId}`);
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    if(!cube) {
        res.redirect('/404');
    }

    if (cube.owner != req.user._id) {
        return res.redirect('/404');
    }

    res.render('cube/editCubePage', { cube });
});

router.post('/:cubeId/edit', isAuth, async (req, res) => {

    let editedCube = await cubeService.edit(req.params.cubeId, req.body);

    res.redirect(`/cube/${editedCube._id}`);
});

router.get('/:cubeId/delete', async (req,res) => {

    const cube = await cubeService.getOne(req.params.cubeId).lean();

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    res.render('cube/deleteCubePage', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {

    await cubeService.delete(req.params.cubeId);

    res.redirect('/');

});

module.exports = router;
