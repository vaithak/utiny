var validUrl = require('valid-url');
var db = require("./db");
var base62 = require("base62/lib/custom");
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
charset = base62.indexCharset(charset);

function checkValid(url,res,callback)
{
  url = url.trim();
  console.log(url);
  if(url.substr(0,4)=="ftp:" || url.substr(0,5)=="http:" || url.substr(0,6)=="https:" || url.substr(0,7)=="mailto:")
  {
    if (validUrl.isUri(url))
    {
      if( url.search(/^(http:\/\/|https:\/\/)?utiny.herokuapp.com\/*/i) != -1 )
      {
        var index = url.search(/com/i);
        index=index+3;

        var strFind = url.substr(index);
        if(strFind.length > 1 && strFind[0] == '/')
        {
          strFind = strFind.substr(1);
          var id = base62.decode(strFind,charset);
          db.findURL(id,function(err,data){
            if(data!="null")
            {
              res.status(200);
              res.render('index',{
                reverse: data,
                output: "",
                status: ""
              });
              callback(null,0,url);
            }
            else {
              res.status(404);
              res.render('index',{
                reverse: "",
                output: "",
                status: "Invalid Shortened URL"
              });
              callback(null,0,url);
            }
          });
        }
        else
        {
          db.checkInDB(url,function(err,data){
            if(err) throw err;

            if(data == 0)
              callback(null,1,url);
            else {
              res.status(200);
              res.render('index',{
                reverse: "",
                output: "https://utiny.herokuapp.com/" + data,
                status: ""
              });
              callback(null,0,url);
            }
          });
        }
      }
      else {
        db.checkInDB(url,function(err,data){
          if(err) throw err;

          if(data == 0)
            callback(null,1,url);
          else {
            res.status(200);
            res.render('index',{
              reverse: "",
              output: "https://utiny.herokuapp.com/" + data,
              status: ""
            });
            callback(null,0,url);
          }
        });
      }
    }
    else {
        callback(null,-1);
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
            reverse: "",
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
