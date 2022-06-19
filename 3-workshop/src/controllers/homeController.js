const router = require('express').Router();
const cubeService = require('../services/cubeService');

/*exports.index = (req, res) => {
    res.render('index', { cubes });
}

exports.about = (req, res) => {
    res.render('about');
}*/

router.get('/', (req, res) => {

    let querystring = req.query;

    let { search, from, to } = querystring;

    const cubes = cubeService.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

/*router.post('/submittedForm', (req, res) => {
    res.send('Successful form submission!');
})*/

module.exports = router;
