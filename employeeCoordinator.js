const mysql = require('mysql');
const inquirer = require('inquirer');
const db = require('./dbConnect.js')

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_coordinatorDB',
});
// Function to return to Initial Prompt
const reinit = () => {
  inquirer
    .prompt({
      name: 'reinit',
      type: 'list',
      message: 'Select to Return',
      choices: ['Return'],
    })
    .then(() => {
      initialize();
    });
};
// Initial Prompt
const initialize = () => {
  inquirer
    .prompt({
      name: 'initialize',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add an Employee',
        'Add a Role',
        'Add a Department',
        'Update Employee Roles',
        'Exit'
      ],
    })
    .then((answer) => {
      if (answer.initialize === 'View All Employees') {
        db.showAllEmployees(reinit);
      } else if (answer.initialize === 'View All Roles') {
        db.showAllRoles(reinit);
      } else if (answer.initialize === 'View All Departments') {
        db.showAllDepartments(reinit);
      } else if (answer.initialize === 'Add an Employee') {
        db.getEmployeeInfo(enterEmployee);
      } else if (answer.initialize === 'Add a Role') {
        db.getRoleInfo(enterRole);
      } else if (answer.initialize === 'Add a Department') {
        enterDepartment();
      } else if (answer.initialize === 'Update Employee Roles') {
        db.getEmployeeUpdate(updateEmployeeRoles);
      } else {
        connection.end();
      }
    });
};
// Inquirer prompt for adding employees
const enterEmployee = (managersArray, rolesArray) => {
  // Push managers' names and all roles into arrays
  managersArray.push({ name: "None (Employee is a Manager)", value: null });
  // Inquirer prompt to gather info on new employee
  inquirer
    .prompt([
      { name: 'first_name', type: 'input', message: "What is the employee's first name?" },
      { name: 'last_name', type: 'input', message: "What is the employee's last name?" },
      { name: 'role', type: 'list', message: "What is the employee's role?", choices: rolesArray },
      { name: 'manager', type: 'list', message: "Who is the employee's manager? (If applicable)", choices: managersArray },
    ])
    .then((answer) => {
      db.addEmployee(answer.first_name, answer.last_name, answer.role, answer.manager, initialize);
    });
};
// Inquirer prompt for adding roles
const enterRole = (deptArray) => {
  inquirer
    .prompt([
      { name: 'title', type: 'input', message: "What is the title of the role?" },
      { name: 'salary', type: 'input', message: "What salary will the role recieve?" },
      { name: 'department', type: 'list', message: "Which department will fulfill this role?", choices: deptArray },
    ])
    .then((answer) => {
      db.addRole(answer.title, answer.salary, answer.department, initialize);
    });

};
// Inquirer prompt for adding departments
const enterDepartment = () => {
  inquirer
    .prompt([{ name: 'name', type: 'input', message: "What is the department's name?" }])
    .then((answer) => {
      db.addDepartment(answer.name, initialize);
    });
};
// Inquirer prompt for updating roles
const updateEmployeeRoles = (employeeArray, rolesArray) => {
  inquirer
    .prompt([
      { name: 'employee', type: 'list', message: 'Which employee would you like to update?', choices: employeeArray, },
      { name: 'newRole', type: 'list', message: "What is the employee's new role?", choices: rolesArray, }
    ])
    .then((answer) => {
      db.changeRole(answer.employee, answer.newRole, initialize)
    });
}
// Connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  initialize();
});