const mysql = require('mysql')
const db = mysql.createConnection({
    host:'34.170.104.75',
    user:'root',
    password:'admin',
    database:'database_user'
})

module.exports = db