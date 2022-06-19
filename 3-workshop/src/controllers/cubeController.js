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
    cubeService.save(cube)
        .then(() => {
            // Redirect to page:
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.get('/:id', (req, res) => {
    res.render('details');
})


module.exports = router;
