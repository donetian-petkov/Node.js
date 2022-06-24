const router = require('express').Router();
const authService = require('../services/authService');
const { SESSION_NAME } = require('../config/env');
const {isAuth} = require("../middlewares/authMiddleware");

router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.post('/login', async (req,res) => {

    const { username, password } = req.body;

    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(SESSION_NAME, token, {httpOnly: true});

    res.redirect('/');

});

router.get('/register', (req,res) => {
    res.render('auth/register');
});

router.post('/register', async (req,res) => {

    const { username, password, repeatPassword, address } = req.body;

    if (password !== repeatPassword) {

        return res.render('auth/register', { error: 'Password mismatch!'});
    }

    try {
        const createdUser = await authService.create({username, password, address});
        const token = await authService.createToken(createdUser);

        res.cookie(SESSION_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        return res.render('auth/register', { error: 'db error'});
    }
});

router.get('/logout', isAuth,(req,res) => {
    res.clearCookie(SESSION_NAME);
    res.redirect('/');
})


module.exports = router;

