const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        unique: true,
        minLength: 5
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        minLength: 10
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        minLength: 4
    }
});

userSchema.pre('save', function(next) {

    bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        });

})

const User = mongoose.model('User', userSchema);

module.exports = User;
