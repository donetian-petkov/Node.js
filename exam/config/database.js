const mongoose = require('mongoose');
const { DB_QUERY_STRING } = require('./env');

exports.DbInit = () => {

    mongoose.connection.on('open', () => {
        console.log('Database is connected!')
    });

    return mongoose.connect(DB_QUERY_STRING);

};
