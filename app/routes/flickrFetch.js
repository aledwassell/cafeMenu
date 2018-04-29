const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const fs = require('fs');
let apiKey = JSON.parse(fs.readFileSync('config/FlickrApiKey.json', 'utf8'));
const Flickr = require('flickrapi'),
    flickrOptions = {
        api_key: apiKey.apiKey,
        secret: apiKey.secret,
        // user_id: '157408260@N04'
        user_id: '11644213@N04'
    };

module.exports = (router) => {
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
                result.photos.photo.map((img) => {
                    img.description = 'A photo description soon to be populated with actual data.'
                    img.author = 'Aled Wassell'
                })
                res.send(result);
            })
        });
    }

    router.get('/photos', jsonParser, (req, res) => {
        getPhoto(req, res)
    })
    const getSetList = (req, res) => {
        let id = req.body.id;
        console.log(req.body);
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            flickr.photosets.getList({
                photoset_id: id,
                user_id: flickr.options.user_id,
                page: 1,
                per_page: 20
                // primary_photo_extras: 'license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o'
            }, function(err, results) {
                if(err){
                    res.send(`There was an error ${err}`)
                    return false;
                }
            })
            console.log(results)
        });
    }

    const getPhotoSets = (req, res) => {
        getSetList(req, res);
        let id = req.body.id;
        console.log(req.body);
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            flickr.photosets.getPhotos({
                photoset_id: id,
                user_id: flickr.options.user_id,
                page: 1,
                per_page: 20,
                extras: 'license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o'
            }, function(err, results) {
                if(err){
                    res.send(`There was an error ${err}`)
                    return false;
                }

                let responseData = {};

                responseData.id = results.photoset.id;
                responseData.title = results.photoset.title;
                responseData.author = results.photoset.ownername;
                responseData.photosUrls = [];
                results.photoset.photo.map((photo) => {
                    responseData.photosUrls.push(
                        {
                            title: photo.title,
                            url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`
                        }
                    )
                });
                res.send(responseData);
            })
        });
    }
    router.post('/sets', jsonParser, (req, res) => {
        getPhotoSets(req, res);
    })
}