const mysql = require("mysql");
const util = require("util");

require("dotenv").config();



let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "employee_db"
});

connection.connect(function(error){
    if(error){
        console.error("Error Connecting" + error.stack)
        return;
    }
    console.log("connected as id: " + connection.threadId)
});;

connection.query = util.promisify(connection.query);


module.exports = connection;