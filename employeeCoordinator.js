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
      name: 'initialize',
      type: 'list',
      message: 'Select to Return',
      choices: [
        'Return',
      ],
    })
    .then((answer) => {
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
        'Add Employees',
        'Add Roles',
        'Add Departments',
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
      } else if (answer.initialize === 'Add Employees') {
        chooseEmployee();
      } else if (answer.initialize === 'Add Roles') {
        chooseRole();
      } else if (answer.initialize === 'Add Departments') {
        chooseDepartment();
      } else if (answer.initialize === 'Update Employee Roles') {
        db.updateEmployeeRoles();
      } else {
        connection.end();
      }
    });
};

const chooseEmployee = () => {
  inquirer
    .prompt([
      { name: 'first_name', type: 'input', message: "What is the employee's first name?" },
      { name: 'last_name', type: 'input', message: "What is the employee's last name?" },
      {
        name: 'role', type: 'list', message: "What is the employee's role?", choices: [
          "A",
          "B",
          "C"
        ]
      },
      {
        name: 'manager', type: 'list', message: "Who is the employee's manager?", choices: [
          "A",
          "B",
          "C"
        ]
      },
      { name: 'again', type: 'confirm', message: "Would you like to add another employee?" },
    ])
    .then((answer) => {
      console.log(`Added ${answer.first_name} ${answer.last_name} to the database.`);
      console.log(answer.role);
      console.log(answer.manager);

      if (answer.again) {
        chooseEmployee();
      } else {
        initialize();
      }

    });
};

const chooseRole = () => {
  inquirer
    .prompt([
      { name: 'title', type: 'input', message: "What is the title of the role?" },
      { name: 'salary', type: 'input', message: "What salary will the role recieve?" },
      {
        name: 'department', type: 'list', message: "Which department will fulfill this role?", choices: [
          "A",
          "B",
          "C"
        ]
      },
      { name: 'again', type: 'confirm', message: "Would you like to add another role?" },
    ])
    .then((answer) => {
      console.log(`Added Role: ${answer.title} to the database.`);
      console.log(answer.salary);
      console.log(answer.department);

      if (answer.again) {
        chooseRole();
      } else {
        initialize();
      }

    });

};

const chooseDepartment = () => {
  inquirer
    .prompt([
      { name: 'dept', type: 'input', message: "What is the department's name?" },
      { name: 'again', type: 'confirm', message: "Would you like to add another department?" },
    ])
    .then((answer) => {
      console.log(`Added Department: ${answer.dept} to the database.`);

      if (answer.again) {
        chooseDepartment();
      } else {
        initialize();
      }

    });

};

// Connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  initialize();
});

