const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const fs = require('fs');
let apiKey = JSON.parse(fs.readFileSync('config/FlickrApiKey.json', 'utf8'));
const Flickr = require('flickrapi'),
    flickrOptions = {
        api_key: apiKey.apiKey,
        secret: apiKey.secret,
        user_id: '157408260@N04'
    };


module.exports = (app) => {
    const getPhoto = (req, res) => {
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            flickr.photos.search({
                user_id: flickr.options.user_id,
                page: 1,
                per_page: 20
            }, function(err, result) {
                if(err){
                    res.send(`There was an error ${err}`)
                    return false;
                }
                res.send(result);
            });
        });
    }

    app.get('/photos', jsonParser, (req, res) => {
        getPhoto(req, res)
    })
}