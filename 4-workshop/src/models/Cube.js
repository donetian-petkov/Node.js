const mongoose = require('mongoose');
const {mongo} = require("mongoose");

const cubeSchema = new mongoose.Schema({
     name: {
        type: String,
         required: true
     },
    description: {
        type: String,
        required: true,
        maxLength: 120
    },
    imageUrl: {
        type: String,
        required: true,

    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    }
});

cubeSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http');
}, 'imageUrl should be a link!');

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
