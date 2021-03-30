const express = require('express');
const path = require('path');
const app = express();
var port = process.env.PORT || 8520;


app.use(express.static(path.join(__dirname, 'build')));

app.use('/.well-known', express.static('.well-known'));

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, function () {
    console.log(`app listen port is ${port}`)
});
