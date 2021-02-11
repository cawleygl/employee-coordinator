const mysql = require('mysql');
const inquirer = require('inquirer');
const reference = require('./dbConnect.js')

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_coordinatorDB',
});

// Initial Prompt
const initialize = () => {
  inquirer
    .prompt({
      name: 'initialize',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employees',
        'Add Departments',
        'Add Roles',
        'Update Employee Roles',
      ],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.initialize === 'View All Employees') {
        reference.viewAllEmployees();
      } else if (answer.initialize === 'View All Departments') {
        reference.viewAllDepartments();
      } else if (answer.initialize === 'View All Roles') {
        reference.viewAllRoles();
      } else if (answer.initialize === 'Add Employees') {
        reference.addEmployees();
      } else if (answer.initialize === 'Add Departments') {
        reference.addDepartments();
      } else if (answer.initialize === 'Add Roles') {
        reference.addRoles();
      } else if (answer.initialize === 'Update Employee Roles') {
        reference.updateEmployeeRoles();
      } else {
        connection.end();
      }
    });
};

// Connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  initialize();
});
