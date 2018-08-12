// require('dotenv').config();

var mysql = require('mysql');

var pool  =    mysql.createPool({
    connectionLimit : 100, //important
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    port            : 3306,
    database        : process.env.DB_NAME
});

function getId(callback)
{
  pool.getConnection(function(err,connection)
  {
    if (err) {
      throw err;
    }

        connection.query("select max(ID) from urls",function(err,rows){
            connection.release();
            if(!err) {
                var index = rows[0]['max(ID)'] + 1;
                callback(null,index);
            }
            else {
              callback(err,null);
            }
        });
  });

}

function insertInto(unique_ID,url,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (err) {
      throw err;
    }
        var sql = "INSERT INTO urls (unique_key,actual) VALUES('" + unique_ID + "','" + url + "');"
        connection.query(sql,function(err,rows){
            connection.release();
            if(!err) {
                callback(null,1);
            }
            else {
              console.log(sql);
              callback(null,0);
            }
        });
  });
}

function findURL(id,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (err) {
      throw err;
    }

        connection.query("SELECT actual FROM urls WHERE ID=" + id + ");",function(err,rows){
            connection.release();
            if(!err) {
                callback(null,rows[0]['actual']);
            }
        });
  });
}

module.exports = {
  getId: getId,
  insertInto: insertInto,
  findURL: findURL
};
