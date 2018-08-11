const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.status(200);
  res.sendFile(path.join(__dirname + "public" + '/index.html'));
});

// app.post('/encode',function(req,res){
//
// });

app.listen(3000, function(){
   console.log('Example app listening on port 3000!');
});

module.exports.server = app;
