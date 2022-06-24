const express = require('express');
const { PORT } = require('./config/env');
const hbs = require('express-handlebars');
const routes = require('./routes');
const { DbInit } = require('./config/database')
const cookieParser = require('cookie-parser');
const {auth} = require("./middlewares/authMiddleware");
const {errorHandler} = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(auth);
app.use(routes);
app.use(errorHandler);

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


DbInit();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}....`));
