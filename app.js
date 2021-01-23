const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "LS2jNHzXtr[LQB&+4I#y",

    database: "business_DB",
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init();
  });


  function init() {
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "welcomePrompt",
        choices: ["View All Employees",
        "View All Roles",
        "View All Departments", 
        "View All Employees By Department", 
        "View All Employees By Role", 
        "Add Employee", 
        "Update Employee Role", 
        "Add Role", 
        "Add Department",
        "Exit Tracker"],
      },
    ]).then(({welcomePrompt}) => {
      switch (welcomePrompt) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;
        
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Employees By Department":
          viewEmpDepts();
          break;
        
        case "View All Employees By Role":
          viewEmpRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Update Employee Role":
          updateEmp();
          break;

        default:
          exitApp();
      }
    })

  };
  