'use strict';

let path = require('path');

const express = require('express'),
    app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use("/app", express.static(path.resolve(__dirname, 'app')));
app.use("/node_modules", express.static(path.resolve(__dirname, '../node_modules')));

// Mounting the API to the current version (path)
app.use('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8001, function () {
    console.log(' The app is up on port: ', 8001);
});