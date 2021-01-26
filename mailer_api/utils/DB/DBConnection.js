const mysql = require('mysql');

const { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT, DB_ENDPOINT, ENV } = process.env;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME
});

db.connect(function (err) {

    if (err) throw err;

    console.log(`Connection to DB "${DB_NAME}"`);

});

module.exports = db;

