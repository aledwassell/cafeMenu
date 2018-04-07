const flickrFetch = require('./flickrFetch');
module.exports = ((app, db) => {
    flickrFetch(app);
});