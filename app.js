
const inquirer = require("inquirer");
const DB = require("./SQL/DB")
require("dotenv").config();
const cTable = require("console.table");


function startApp() {
    inquirer
        .prompt({
            type: "list",
            name: "start",
            message: "Please view the choices and let me know what you would like to do",
            choices: ["View Departments", "View Employees", "View Roles", "Finish"],
        }).then(function (answer) {
            //switch statement
            switch (answer.start) {
                case "View Departments":

                    Department_Prompt();
                    break;
                case "View Employees":
                    Employee_Prompt();
                    // code block
                    break;
                case "View Roles":
                    Role_Prompt();
                default:
                    finish();
                // code block
            }
        })
}

function Department_Prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "departmentList",
                message: "What would you like to do?",
                choices: [
                    "View Departments",
                    "Add New Department",
                    "Exit",
                ],
            },
        ])
        .then((answer) => {
            switch (answer.departmentList) {
                case "View Departments":
                    View_All_Departments();
                    break;
                case "Add New Department":
                    Add_Department();
                    break;
                default:
                    startApp();
            }
        });
}

function Employee_Prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "employeeMenu",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "List Employees by Department",
                    "Exit",
                ],
            },
        ])

        .then((answer) => {
            switch (answer.employeeMenu) {
                case "View All Employees":
                    View_All_Employees();
                    break;
                case "Add Employee":
                    Add_Employee();
                    break;
                case "List Employees by Department":
                    List_Employees_By_Department();
                    break;
                default:
                    startApp();
            }
        });
}

function Role_Prompt() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "rolesList",
                message: "What would you like to do?",
                choices: [
                    "View All Positions",
                    "Add a New Position",
                    "Exit",
                ],
            },
        ])
        .then((answer) => {
            switch (answer.rolesList) {
                case "View All Positions":
                    View_All_Roles();
                    break;
                case "Add a New Position":
                    Add_Role();
                    break;
                default:
                    startApp();
            }
        });
}

const View_All_Departments = () => {
    console.log("Here are the active departments:");
    DB.getAllDeparments().then(function (res) {
        printTable(res);
        mainMenu();
    });
};

function View_All_Employees() {
    console.log("Here is your full roster of employees");
    DB.getAllEmployees().then(function (response) {
      printTable(response);
      startApp();
    });
  }

  const View_All_Roles = () => {
    console.log("Here are the current roles for your organization");
    DB.getAllRoles().then((data) => {
      printTable(data);
      startApp();
    });
  };

  async function List_Employees_By_Department() {
    const departments = await DB.getAllDepartments();
    const departmentArray = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    inquirer.prompt([{
      type: "list",
      name: "departmentChoice",
      message: "Which department would you like to see?",
      choices: departmentArray
    }]).then(function(response) {
      console.log(response.departmentChoice)
      DB.listEmployeesByDepartment().then(function(response){
        printTable(response)

      })
    })
  }
  const Add_Department = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What is the name of the department you wish to add?",
        },
      ])
      .then(function (answer) {
        DB.createDepartment(answer.departmentName).then((response) => {
          console.log(response);
          View_All_Departments();
        });
      });
  };
  async function Add_Role() {
    const departments = await DB.getAllDepartments();
    
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "what is the title for this role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this position?",
        
        },
        {
          type: "list",
          name: "departmentID",
          message: "Which department is assigned this position",
          choices: departmentChoices
        },
      ])
      .then((answers) => {
        DB.createRole(answers.title, answers.salary, answers.departmentID).then(
          function (response) {
            console.log(response);
            View_All_Roles();
          }
        );
      });
  };
  async function Add_Employee() {
  
    const roles = await DB.getAllRoles();
    
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter a name";
          }
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please do not leave this field blank";
          }
        },
        {
          type: "list",
          name: "roleID",
          message: "what is this employee's position?",
          choices: roleChoices
        }
      ])
      
      .then(function(answers) {
        DB.createEmployee(
          answers.firstName,
          answers.lastName,
          answers.roleID
        ).then(function (response) {
          console.log(response);
          View_All_Employees();
        });
      });
  };
  function finish() {
    console.log("Thank you for using my app, i hope it worked");
    process.exit()
  }




startApp();

