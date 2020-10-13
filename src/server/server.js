var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express()

app.use(express.static('dist'))

const apiKey = process.env.API_KEY;
const https = require('follow-redirects').https;
const fs = require('fs');

let projectData = {};

function getRequest(text="hello") {
    var options = {
        'method': 'POST',
        // 'hostname': 'api.mathjs.org',
        // 'path': '?expr=2%2B3*sqrt(4)',
        'hostname': 'https://api.meaningcloud.com/',
        'path': `/sentiment-2.1?key=${apiKey}&lang=en&txt=${text}`,
        'headers': {
        },
        'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();

    return req;
}

app.post('/feelings', function (req, res) {
    const feelingsData = getRequest();
    console.log(feelingsData);
    res.send(feelingsData);
})


app.get('/data', (req, res) => {
    res.send(projectData);
})

app.get('/', function (req, res) {
    // res.sendFile(path.resolve('dist/index.html'));
    res.sendFile(path.resolve('../../src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

