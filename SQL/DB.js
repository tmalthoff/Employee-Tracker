const connection = require("./connection");

class DB {
    constructor(){
        this.connection = connection
    }
    getAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }

    getAllRoles() {
        return this.connection.query("SELECT * FROM role")
    }

    getAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }
    createDepartment(name) {
        return this.connection.query("INSERT INTO department SET ?", {
            dep_name: name
        })
    }
    createRole(title, salary, department_id) {
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }
    createEmployee(firstName, lastName, role_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
          first_name: firstName,
          last_name: lastName,
          role_id: role_id
        })
      }
      listEmployeesByDepartment() {
        return this.connection.query("SELECT employee.first_name, employee.last_name, employee.role_id FROM employee")
      }
}



module.exports = new DB(connection)