var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
require('dotenv').config()
const fetch = require('node-fetch');
var bodyParser = require('body-parser');


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
}

const app = express()

app.use(express.static('dist'))


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
const apiKey = process.env.APIkey;
const https = require('follow-redirects').https;
const fs = require('fs');

let projectData = {};

async function postData(url) {
    // Default options are marked with *
    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
            return response.json(); // parses JSON response into native JavaScript objects
    } catch (e) {
        if (e instanceof TypeError) {
            return {"errorData":"Text must be properly formatted, in English!"};
        } else {
            return {"errorData": "Make sure your credentials are working properly!"}
        }
    }
}

app.post('/feelings', cors(corsOptions), async function (req, res) {
    const text = req.body["data"];
    await postData(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${text}`)
        .then((feelingsData) => {
            try {
                res.send(feelingsData);
            } catch(e) {
                if (e instanceof TypeError) {
                    res.send({ "errorData":"Text must be properly formatted, in English!"});
                } else {
                    res.send({"errorData": "Make sure your credentials are working properly!"});
                }
            }

    })
})

app.get('/data', (req, res) => {
    res.send(projectData);
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
    // res.sendFile(path.resolve('../../src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})