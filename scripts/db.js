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
                var index = rows[0]['max(ID)'] + 10;
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
        var sql = "SELECT actual FROM urls WHERE ID=" + id + ";"
        console.log(sql);
        connection.query(sql,function(err,rows){
            connection.release();
            console.log(rows);
            if(!err) {
              if(rows.length == 0)
              {
                callback(null,"null");
              }
              else {
                  callback(null,rows[0]['actual']);
              }
            }
        });
  });
}

function checkInDB(url,callback)
{
  pool.getConnection(function(err,connection)
  {
    if (err) {
      throw err;
    }

        connection.query("SELECT * FROM urls WHERE actual='" + url + "';",function(err,rows){
            connection.release();
            console.log(rows);
            if(!err) {
              if(rows.length == 0)
              {
                callback(null,0);
              }
              else {
                  callback(null,rows[0]['unique_key']);
              }
            }
            else {
              callback(null,0);
            }
        });
  });
}

module.exports = {
  getId: getId,
  insertInto: insertInto,
  findURL: findURL,
  checkInDB: checkInDB
};
