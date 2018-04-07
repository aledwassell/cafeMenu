const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');

module.exports = (app, db) => {


    app.get('/querybc/:code', (req, res) => {
        if(!req.params.code){
            res.status(500);
            res.send('Error on server, you need to rovide a valid barcode');
            console.log('There was an error, user did not provide barcode')
        }
        const code = req.params.code;
        res.send('Hello world')
        console.log(code);
        request.get({
            //url: `api url&${req.params.code}`
        }, (e, response, body) => {
            if(!e && response.status.code === 200) {
                res.send(body)
            }
        })
    })

}