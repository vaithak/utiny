const express = require('express');
var conversion = require('./scripts/conversion');
var path = require('path');
var checks = require('./scripts/allChecks.js');
var bodyParser = require('body-parser');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// replace with the directory path below
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
  res.status(200);
  res.sendFile(path.join(__dirname + "/public" + '/index.html'));
});

app.get('/encode', function(req, res){
  res.status(200);
  res.sendFile(path.join(__dirname + "/public" + '/index.html'));
});

app.post('/encode',function(req,res){
  if(checks.check(req.body.url,res) != -1)
    {
      conversion.encode(req.body.url,res);
    }
});

//The 404 Route
app.get('*', function(req, res){
  res.status(404);
  res.sendFile(path.join(__dirname + "/public" + '/404.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
   console.log('Example app listening on port ' + port);
});

module.exports.server = app;
