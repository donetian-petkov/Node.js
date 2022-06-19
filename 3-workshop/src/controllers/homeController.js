const cubes = require('../db.json');
const router = require('express').Router();

/*exports.index = (req, res) => {
    res.render('index', { cubes });
}

exports.about = (req, res) => {
    res.render('about');
}*/

router.get('/', (req, res) => {
    res.render('index', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

/*router.post('/submittedForm', (req, res) => {
    res.send('Successful form submission!');
})*/

module.exports = router;
