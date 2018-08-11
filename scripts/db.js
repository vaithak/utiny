require('dotenv').config();

var mysql = require('mysql');
var pool  =    mysql.createPool({
    connectionLimit : 100, //important
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
    database : 'address_book',
    debug    :  false
});

module.exports.pool = pool;
