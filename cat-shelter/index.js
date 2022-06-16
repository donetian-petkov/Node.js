const http = require('http');
/*const homePage = require('./views/home');
const addCatPage = require('./views/addCatPage');*/
/*
const siteCSS = require('./resources/content/styles/site.js');
*/
//const cats = require('./cats.json');

const fs = require('fs/promises');
const queryStr = require('querystring');
const { renderHome } = require('./renderHome.js')

const server = http.createServer(async (req, res) => {

    let [pathname, qs ]  = req.url.split('?');

    let params = queryStr.parse(qs);


    res.writeHead(200, {
        'Content-type': 'text/html'
    });

    if (req.url == '/resources/content/styles/site.css') {
        res.writeHead(200, {
            'Content-type': 'text/css'
        });

        let siteCSS = await fs.readFile('./resources/content/styles/site.css', 'utf-8');

        res.write(siteCSS);
        res.end();
    } else if (req.url === '/cats/add-cat') {
        let addCatPage = await fs.readFile('./views/addCatPage.html', 'utf-8')
        res.write(addCatPage);

    } else {

        let homePageResult = await renderHome(params.name);
        res.write(homePageResult);
    }

    res.end();
}).listen(5000, () => {
    console.log('Server is listening on port 5000...')
});
