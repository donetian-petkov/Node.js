const router = require('express').Router();
const authService = require('../services/authService');
const { sessionName} = require('../config/constants');

router.get('/register', (req, res) => {

    res.render('auth/registerPage');
});

router.post('/register', async (req,res) => {


    let createdUser = await authService.register(req.body);

    if (createdUser) {
        res.redirect('/auth/login');
    } else {

        // TODO: add notification
        res.redirect('404');
    }
});

router.get('/login', (req,res) => {
    res.render('auth/loginPage');
});

router.post('/login', async (req,res) => {

    let token = await authService.login(req.body);

    if (token) {
        res.cookie(sessionName, token);
        res.redirect('/');
    } else {
        res.redirect('404');
    }

});

router.get('/logout', (req,res) => {
    res.clearCookie(sessionName)
    res.redirect('/');
})

module.exports = router;
