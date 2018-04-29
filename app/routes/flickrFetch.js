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

module.exports = (router) => {
    const getPhotoSets = (req, res) => {
        let id = req.body.id;
        console.log(req.body);
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            flickr.photosets.getPhotos({
                photoset_id: id,
                user_id: flickr.options.user_id,
                page: 1,
                per_page: 20,
                extras: 'description, license, owner_name, icon_server, original_format, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o'
            }, function(err, results) {
                if(err){
                    res.send(`There was an error ${err}`)
                    return false;
                }
                res.send(results);
            })
        });
    }
    router.post('/sets', jsonParser, (req, res) => {
        getPhotoSets(req, res);
    })
}