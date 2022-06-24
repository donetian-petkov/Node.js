const jwt = require('jsonwebtoken');
const { sessionName, secret } = require('../config/constants');
const { promisify } = require('util');

exports.auth = async (req, res, next) => {

    let token = req.cookies[sessionName];

    const jwtVerify = promisify(jwt.verify);

    if (token) {

        try {

            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
            res.locals.user = decodedToken;

        } catch  {
            return res.redirect('404');
        }

    }

    next();

};

exports.isAuth = (req, res, next) => {

    if (!req.user) {
        res.redirect('/404');
    }

    next();

};
