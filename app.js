
const inquirer = require('inquirer');
const DB = require("./SQL/DB")


function startApp() {
    inquirer
    .prompt({
       type: "list",
       name: "start",
       message: "Please view the choices and let me know what you would like to do",
       choices: ["View Departments", "View Employees", "view Roles"],
    }).then(function(answer){
        //switch statement
        switch(answer.start) {
            case "View Departments":
             viewDepartments()
              break;
            case "View Employees":
              // code block
              break;
            default:
              // code block
          }
    })
}

function viewDepartments() {
    DB.getAllDeparments().then(function(departments){
        console.log(departments)
    })
}

startApp();