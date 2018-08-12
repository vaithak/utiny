var validUrl = require('valid-url');
var db = require("./db");

function checkValid(url,res,callback)
{
  console.log(url);
  if(url.substr(0,3)=="ftp:" || url.substr(0,4)=="http:" || url.substr(0,5)=="https:" || url.substr(0,6)=="mailto:")
  {
    if (validUrl.isUri(url))
    {
        db.checkInDB(url,function(err,data){
          if(err) throw err;

          if(data == 0)
            callback(null,1,url);
          else {
            res.status(200);
            res.render('index',{
              output: "https://utiny.herokuapp.com/" + data,
              status: ""
            });
            callback(null,0,url);
          }
        });
    }
    else {
        rcallback(null,-1);
    }
  }
  else{
    url = "http://" + url;
    if (validUrl.isUri(url))
    {
      db.checkInDB(url,function(err,data){
        if(err) throw err;

        if(data == 0)
          callback(null,1,url);
        else {
          res.status(200);
          res.render('index',{
            output: "https://utiny.herokuapp.com/" + data,
            status: ""
          });
          callback(null,0,url);
        }
      });
    }
    else {
        callback(null,-1,url);
    }
  }
}

module.exports ={
  check: checkValid
};
