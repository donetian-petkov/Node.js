const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static('./public'));

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => console.log(`App is listening on port 5000...`));
