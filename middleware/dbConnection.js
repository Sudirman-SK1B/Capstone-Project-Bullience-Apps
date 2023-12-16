const mysql = require('mysql');

const db = mysql.createConnection({
    host : "34.128.113.87",
    user : "root", 
    password : "admin",
    database : "db_user"
})
    db.connect((err) => {
        if(err) throw err;
        console.log("Database Connected");
    })

module.exports = db;