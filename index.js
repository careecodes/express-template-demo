const http = require('http');
const hostname = '127.0.0.1';
const port = 4000;

// Require Express, initalize app
const express = require('express');
const app = express();

// Logging Middleware
const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

// Security Middleware
// const helmet = require('helmet');
// app.use(helmet());

// Enable static files
app.use(express.static('public'));

app.all('*', (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Express Template Engine
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);

// Blog Route Handler
app.get('/blog', (req, res) => {
    res.render('blog', {
        locals: {
            title: 'Blog',
        },
        partials: {
            head: 'partials/head',
            nav: 'partials/nav',
            footer: 'partials/footer',
        },
    });
});

// Home Page Route Handler
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

// About Page Route Handler
app.get('/about', (req, res) => {
    res.render('about', {
        locals: {
            title: 'About',
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

// app.get('*', (req, res) => {
//     res.send('This is not the "home" page');
// });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});