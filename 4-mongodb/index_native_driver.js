const express = require('express');
const hbs = require('express-handlebars');
const { MongoClient } = require('mongodb');

const app = express();
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect()
    .then(() => {
        console.log('DB Connected Successfully');
    })
    .catch( err => {
        console.log(err);
    });

const db = client.db('forum');
const themesCollection = db.collection('themes');

app.engine('hbs', hbs.engine({
    extname: "hbs"
}));

app.set('view engine', 'hbs');

app.get('/',(req,res) => {
    res.render('home');
});

app.get('/themes', async (req, res) => {
   const themes = await themesCollection.find({themeName: 'Angular 10'}).toArray();

   res.render('themes', { themes });
})

app.listen(5000, () => console.log('Serer is listening on port 5000...'));
