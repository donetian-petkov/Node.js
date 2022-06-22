const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
           /* function() {
                return this.imageUrl.startsWith('http')
            }*/
            validator: /^http/g,
            message: 'ImageUrl should start with http'
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 120
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
