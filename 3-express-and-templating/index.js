const express = require('express');
const fs = require('fs');
const path = require('path');
const { catMiddleware } = require('./middlewares');
const handlebars = require('express-handlebars');

const users = [
    { name: 'Pesho', age: 20},
    { name: 'Tosho', age: 25},
    { name: 'Penka', age: 40},
];

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
})); // register engine
app.set('view engine', 'hbs'); // set which engine we will use


app.use(catMiddleware);

app.use('/static', express.static('./public'));

/*app.get('/public/img/:imgName', (req, res) => {
    res.sendFile(path.resolve('./public/img', req.params.imgName) );
});*/

//action
app.get('/:name?', (req, res) => {
   /*res.write('Hello World');
   res.end();*/
   /* res.send('Hello World');*/

    res.render('home', {
        name: req.params.name || 'Guest',
        users,
        isAuth: true,
        danger: '<script>alert("you are hacked!")</script>'
    });

});

app.post('/cats/:catName', (req, res) => {
    req.cats.push(req.params.catName);

    res.send(`Add ${req.params.catName} The Collection`);
});

app.get('/cats/:catId(\\d+)', (req, res) => {

    let catId = Number(req.params.catId);

    res.send(req.cats[catId]);
});

app.get('/cats',  (req, res) => {
    if (req.cats.length < 1){
        res.send('No cats here!');
    } else {
        res.send(req.cats.join(', '));
    }
});

/*app.post('/cats', (req, res) => {
    //TO DO IMPLEMENT
    res.send('Add new cat to the colllection!');
});*/

app.put('/cats', (req, res) => {
    //TO DO IMPLEMENT
    res.send('Modify existing cat');
});

app.get(/[0-9]+/, (req, res) => {
    res.send('This route starts with number');
});

app.get('/download', (req,res) => {
    res.writeHead(200, {
        'content-disposition': 'attachment; filename="sample.pdf"'
    });

    const readStream = fs.createReadStream('sample.pdf');

    readStream.pipe(res);

   /* readStream.on('data', (data) => {
        res.write(data);
    });

    readStream.on('end', () => {
        res.end();
    });*/

});

app.get('/express-download', (req,res) => {

    /*res.download('./sample.pdf');*/

    res.sendFile(__dirname + '/sample.pdf');

});

app.get('/redirect', (req, res) => {
    res.writeHead(301, {
        'Location' : '/cats'
    });

    res.end();
});

app.get('/express-redirect', (req,res) => {
    res.redirect('/cats');
});

app.all('*', (req, res) => {
    res.status(404);
    res.send('This page was not found');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
