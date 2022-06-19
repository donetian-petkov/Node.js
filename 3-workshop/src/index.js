const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes')

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.use(routes);

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.listen(5000, () => console.log(`App is listening on port 5000...`));
