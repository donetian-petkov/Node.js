const router = require('express').Router();
const cubeService = require("../services/cubeService");

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

    const cube = await cubeService.getOne(req.params.id);

    res.render('details', { cube });
})


module.exports = router;
