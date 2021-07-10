const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

// Require Express, initalize app
const express = require('express');
const app = express();

// Express Template Engine
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

// Home Page
app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            title: 'Home',
        },
        partials: {
            head: 'partials/head',
            nav: 'partials/nav',
            footer: 'partials/footer',
        },
    });
});

app.get('/favicon.ico', (req, res) => {
    res.send('');
});

app.get('*', (req, res) => {
    res.send('This is not the home page')
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});