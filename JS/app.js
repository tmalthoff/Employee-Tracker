const mysql = require('mysql');
const inquirer = require('inquirer');


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "TMA1Alth123",
    database: "employee_db"
});


module.exports = connection;