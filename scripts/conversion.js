var base62 = require("base62/lib/custom");
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
charset = base62.indexCharset(charset);

var db = require("./db");

function encode_URL(url,res)
{
    db.getId(function(err,data){
    if(err) throw err;

    var id = base62.encode(data,charset);

    db.insertInto(id,url,function(err,data){
      if(data!=1)
        {
          res.status(501);
          res.send("Server ERROR!");
        }
      else
      {
        res.status(200);
        var shortened_url = id;
        var output = "Your shortened url is " + shortened_url;
        res.render('index', {
            output: output
        });
      }
    });
  });

}

function decode_URL(encoded_url,res)
{
  var id = base62.decode(encode_URL,charset);
  var url = db.findURL(id);

  if(url.length != 0)
  {
    res.status(301);
    res.redirect(url);
  }
}

module.exports = {
  encode: encode_URL,
  decode: decode_URL
}
