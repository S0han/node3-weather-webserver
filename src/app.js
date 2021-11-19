const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directories
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help message',
        title: 'Help',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    } else {
        geocode(req.query.address, (error, {latitude, longitude, place_name } = {}) => {

            if (error) {
                return res.send({ error });
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
    
                res.send({
                    forecast: forecastData,
                    location: place_name,
                    address: req.query.address
                });
            }); 
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/404', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Andrew Mead',
        msg: 'Error!'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help error',
        name: 'Andrew Mead',
        error: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        name: 'Andrew Mead',
        error: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});