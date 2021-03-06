const express = require('express');
const routes = require('./routes')
const { initialiseDatabase } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

require('./config/handlebars')(app);

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use(auth);
app.use(routes);

initialiseDatabase()
    .then(() => {
        app.listen(5000, () => console.log(`App is listening on port 5000...`));
    })
    .catch( err => {
        console.log('Cannot connect to database: ', err);
    });

