const router = require('express').Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cube = req.body;

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

    res.render('details', { cube });
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


module.exports = router;
