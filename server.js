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
  res.status(20);
  res.redirect('/');
});

app.post('/encode',function(req,res){
  console.log(req.body);
  checks.check(req.body.url,res, function(err,checkingStatus,url){
    console.log(checkingStatus);
    if(checkingStatus == 1)
      {
        conversion.encode(url,res);
      }
    else if(checkingStatus == -1) {
      res.render('index',{
        reverse: "",
        output: "",
        status: "Invalid URL"
      });
    }
  });
});

//The 404 Route
app.get('*', function(req, res){
  conversion.decode(req.path.substr(1),res,function(err,data){
    if(err) throw err;
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
   console.log('Example app listening on port ' + port);
});

module.exports.server = app;
