const { SESSION_NAME, SECRET } = require('../config/env');
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    const token = req.cookies[SESSION_NAME];

    if (token) {

      jwt.verify(token, SECRET, (error, decodedToken) => {
          if (error) {
              res.clearCookie(SESSION_NAME);
              return next();
          }

          req.user = decodedToken;
          res.locals.user = decodedToken;

          next();

      });

    } else {

        next();
    }

};

exports.isAuth = (req, res, next) => {

    if (!req.user) {

        return res.redirect('/login');

    }

    next();

}
