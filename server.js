const express = require('express');
const app = new express();
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require("./db.config.js");

const connectionString = 'mongodb+srv://'+dbConfig.dbUserName+':'+dbConfig.dbPassword+'@cluster0.bcgup.gcp.mongodb.net';

app.use("/", express.static(__dirname + "/"));

app.get('/', function(request, response){
    response.sendFile('index.html');
});

app.get("/api/read-from-json-file", (req, res) => {
    fs.readFile('./some-json.json', { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.error("Error message: ", err);
            return;
        }
        res.send(data);
    });
})

app.get("/api/restaurants", (req, res) => {
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        // res.send({ "test": 'Hello World!' });

        const db = client.db('sample_restaurants');
        const quotesCollection = db.collection('restaurants');

        db.collection('restaurants').find().toArray()
        .then(results => {
            console.log(results);
            res.send(results);
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

app.listen(process.env.port || 3000);