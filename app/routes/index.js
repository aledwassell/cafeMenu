const route = require('./routes');
const products = require('./products');
const scanner = require('./scanner');
const weather = require('./weather')
const flickrFetch = require('./flickrFetch');
module.exports = ((app, db) => {
    route(app, db);
    products(app, db);
    scanner(app, db);
    weather(app);
    flickrFetch(app);
});