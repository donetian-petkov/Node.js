const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');

exports.create = (userData) => User.create(userData);

exports.login = async (username, password ) => {

   const user = await User.findOne({username});

   if (!user) {
       throw {
           message: 'Cannot find username!'
       }
   }

   const isValid = await bcrypt.compare(password, user.password);

   if (!isValid) {
       throw {
           message: 'The passwords do not match!'
       }
   }

   return user;

};

exports.createToken = (user) => {

    const payload = {_id: user._id, username: user.username, address: user.address};

    const tokenPromise = new Promise((resolve,reject) => {
        jwt.sign(payload, SECRET, { expiresIn: '2d'}, (err, decodedToken) => {

            if (err) {
                return reject(err);
            }

            resolve(decodedToken);

        });

    })

    return tokenPromise;

};
