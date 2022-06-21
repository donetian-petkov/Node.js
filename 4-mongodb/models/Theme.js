const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    themeName: {
        type: String,
        required: [true, 'Theme name is required'],
        minLength: 2
    },
    created_at: Date
});

// First Way to set method on the collection
themeSchema.method('getInfoFirst', function () {
    return `First Method: This theme is ${this.themeName} and was created at: ${this.created_at}`;
});

// Second Way to set method on the collection
themeSchema.methods.getInfoSecond = function () {
    return `Second Method: This theme is ${this.themeName} and was created at: ${this.created_at}`;
}

themeSchema.virtual('isNew')
    .get(function() {
        return new Date(this.created_at).getTime() > new Date('2021-09-24').getTime();
    });

themeSchema.path('themeName').validate(function() {
    return this.themeName.length >= 2 && this.themeName.length <= 20;
}, 'The theme name should be between 2 and 20 characters');

const Theme = mongoose.model('Theme', themeSchema); // the collection's name is themes,
// mongoose converts Theme to themes when selecting the collection

exports.Theme = Theme;
