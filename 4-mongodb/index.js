const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb://localhost:27017/forum';
const themeController = require('./controllers/themeController');

mongoose.connect(url)
    .then(() => {
        console.log('Db is connected successfully!')
    })
    .catch( err => {
        console.log('DB error: ', err);
    });


app.engine('hbs', hbs.engine({
    extname: "hbs"
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}));

app.get('/',(req,res) => {
    res.render('home');
});

app.use('/themes', themeController);


app.listen(5000, () => console.log('Serer is listening on port 5000...'));
