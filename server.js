var express = require('express');
var azureStorageService = require('./azureStorageService.js');

var port = process.env.PORT || 3000;

var app = express()

app.use('/dashboard', express.static('public'));
app.get('/rtt', function (req, res) {
    var location = req.param("location");
    var count = req.param.count || 100;
    azureStorageService.getLatestEntries(count, location).then(result => res.send(result));
});

app.listen(port, function () {
    console.log('Server running at port 3000')
})