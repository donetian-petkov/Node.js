const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
        minLength: 2
    },
    image: {
        type: String,
        required: [true, 'The image is required'],
        validate: {
            validator: /^http+/,
            message: 'image should start with http / https'
        }
    },
    price: {
        type: Number,
        required: [true, 'The price is required'],
        min: 0
    },
    cryptoDescription: {
        type: String,
        required: [true, 'The description is required'],
        minLength: 10
    },
    paymentMethod: {
        type: String,
        enum:['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true
    },
    cryptoUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

/*cryptoSchema.path('image').validate(function() {

    console.log(this);

    return this.image.startsWith('http');
}, 'image should be a link!');*/

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
