const connection = require("./connection");

class DB {
    constructor(){
        this.connection = connection
    }
    getAllDeparments() {
        return this.connection.query("SELECT * FROM department")
    }

    getAllRoles() {
        return this.connection.query("SELECT * FROM role")
    }

    getAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }
}

module.exports = new DB(connection)