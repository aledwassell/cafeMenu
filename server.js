const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./config/db');

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true})
const jsonParser = bodyParser.json();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(db.url, (e, database) => {
    if(e) return console.log('there was an error: ', e)
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log(`Server running at: ${port}/`);
    });
})