const router = require('express').Router();
const { Theme } = require('../models/Theme');

router.get('/', async (req, res) => {

    const themesResult = await Theme.find();

    themesResult.forEach(theme => {
        console.log(theme.getInfoFirst());
        console.log(theme.isNew);
    });

    const themes = await Theme.find().lean();

    res.render('themes', {themes});
});

router.get('/create', (req, res) => {
    res.render('createTheme');
});

router.post('/create', async (req, res) => {

     // First Way to Create DB Document / Row:

    // const theme = new Theme(req.body);

    /* theme.themeName = req.body.themeName;
    theme.createdAt = req.body.createdAt; */

    //  const themeSaveResult = await theme.save();

   //  console.log(themeSaveResult);

    // Second Way to Create DB Document:

    let savedTheme = await Theme.create(req.body);

    console.log(savedTheme);

    res.redirect('/themes');
});

router.get('/:themeId', async (req, res) => {
    // let theme = await Theme.findOne({_id: req.params.themeId}).lean();

    let theme = await Theme.findById(req.params.themeId).lean();

    res.render('themeDetails', { theme });
});

module.exports = router;
