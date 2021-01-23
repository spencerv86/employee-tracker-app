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

function viewEmployees() {
  const queryString = `SELECT CONCAT(employee.first_name," ", employee.last_name) AS "Employee", role.title AS "Job", role.salary AS "Salary", department.name AS "Dept.", IFNULL(CONCAT(mgmt.first_name," ",mgmt.last_name),"Department Lead") AS "Manager Name"
  FROM employee
  INNER JOIN role
  ON role.id = employee.role_id
  INNER JOIN department
  ON department.id = role.department_id
  LEFT JOIN employee mgmt
  ON employee.manager_id = mgmt.id;`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function viewRoles() {
  const queryString = `
  SELECT role.title AS "Job Title", role.salary AS "Salary", department.name AS "Dept."
  FROM role
  INNER JOIN department
  ON department.id = role.department_id;`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function viewDepartments() {
  const queryString = `
  SELECT name AS "Department Name"
  FROM department;`;
  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);
    init();
  });
}

function addEmployee() {
  const managerQuery = `SELECT CONCAT(first_name, " ", last_name) AS managers, id FROM employee;`;
  const roleQuery = `SELECT title, id FROM role;`;
  const managers = [];
  const roles = [];
  connection.query(managerQuery, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      managers.push({ name: data[i].managers, value: data[i].id });
    }
    managers.push({ name: "None", value: 0 });
    // managers.push(data.managers);
    // console.log(managers);
  });
  connection.query(roleQuery, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      roles.push({ name: data[i].title, value: data[i].id });
    }
    // console.log(roles);
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is this employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is this employee's job title?",
        choices: roles,
        name: "role",
      },
      {
        type: "list",
        message: "Who is this employee's manager?",
        choices: managers,
        name: "manager",
      },
    ])
    .then((res) => {
      const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
      connection.query(
        queryString,
        [res.first_name, res.last_name, res.role, res.manager],
        (err, data) => {
          if (err) throw err;
          console.log(
            `${res.first_name} ${res.last_name} has been added as a new ${res.role}.`
          );
          init();
        }
      );
    });
}

function addRole() {
  const deptQuery = `SELECT name AS "departments", id FROM department;`;
  const departments = [];
  connection.query(deptQuery, (err, data) => {
    for (let i = 0; i < data.length; i++) {
      departments.push({ name: data[i].departments, value: data[i].id });
    }
    // console.log(departments);
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this role's title?",
        name: "title",
      },
      {
        type: "input",
        message:
          "What is this position's salary? (please enter number with no punctuation)",
        name: "salary",
        validation: function (input) {
          if (/^\d+$/.test(input)) {
            return true;
          } else {
            return "That is an invalid salary.";
          }
        },
      },
      {
        type: "list",
        message: "What department will this role fall under?",
        name: "dept_id",
        choices: departments,
      },
    ])
    .then((res) => {
      const queryString = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
      connection.query(
        queryString,
        [res.title, res.salary, res.dept_id],
        (err) => {
          if (err) throw err;
          console.log(`${res.title} has been added as a new role.`);
          init();
        }
      );
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this department's name?",
        name: "dept_name",
      },
    ])
    .then((res) => {
      const queryString = `INSERT INTO department (name) VALUES (?);`;
      connection.query(queryString, [res.dept_name], (err) => {
        if (err) throw err;
        console.log(`The ${res.dept_name} department has been added.`);
        init();
      });
    });
}

function updateEmp() {
  const employeeQuery = `SELECT CONCAT(first_name, " ", last_name) AS employees, id FROM employee;`;
  const rolesQuery = `SELECT title, id FROM role;`;
  let employees = [];
  let roles = [];
  connection.query(employeeQuery, (err, data) => {
    if (err) throw err;
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      employees.push({ name: data[i].employees, value: data[i].id });
    }
    // console.log(employees);
    connection.query(rolesQuery, (err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        roles.push({ name: data[i].title, value: data[i].id });
      }
      // console.log(roles);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees,
            name: "emp_id",
          },
          {
            type: "list",
            message: "What will their new role be?",
            choices: roles,
            name: "new_role",
          },
        ])
        .then((res) => {
          const queryString = `UPDATE employee SET role_id = ? WHERE id = ?;`;
          connection.query(queryString, [res.new_role, res.emp_id], (err) => {
            if (err) throw err;
            console.log(`The employee's role has been updated.`);
            init();
          });
        });
    });
  });
}

function exitApp() {
  console.log("See ya later!");
  connection.end();
}

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "welcomePrompt",
        choices: [
          "View All Employees",
          "View Roles",
          "View Departments",
          "View All Employees By Department",
          "View All Employees By Role",
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
          "Exit Tracker",
        ],
      },
    ])
    .then(({ welcomePrompt }) => {
      switch (welcomePrompt) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Departments":
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
    });
}
