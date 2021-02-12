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
        db.getEmployeeInfo(enterEmployee);
      } else if (answer.initialize === 'Add Roles') {
        enterRole();
      } else if (answer.initialize === 'Add Departments') {
        enterDepartment();
      } else if (answer.initialize === 'Update Employee Roles') {
        db.updateEmployeeRoles();
      } else {
        connection.end();
      }
    });
};

const enterEmployee = (managersArray, rolesArray) => {
  // Take database info and parse out the manager's names and all roles
  const nameArray = [];
  const titleArray = [];

  for (i of managersArray) {
    nameArray.push(`${i.first_name} ${i.last_name}`);
  }
  nameArray.push("None (Employee is a Manager)");
  for (i of rolesArray) {
    titleArray.push(`${i.title}`);
  }
  // Inquirer prompt to gather info on new employee
  inquirer
    .prompt([
      { name: 'first_name', type: 'input', message: "What is the employee's first name?" },
      { name: 'last_name', type: 'input', message: "What is the employee's last name?" },
      { name: 'role', type: 'list', message: "What is the employee's role?", choices: titleArray },
      { name: 'manager', type: 'list', message: "Who is the employee's manager? (If applicable)", choices: nameArray },
    ])
    .then((answer) => {
      // Parse out role id
      let roleID = ""
      let managerID = ""

      for (i of rolesArray) {
        if (i.title === answer.role) {
          roleID = i.id;
        }
      }

      if (answer.manager === "None") {
        db.addEmployee(answer.first_name, answer.last_name, roleID, null, initialize);
      } else {
        // Parse out manager id
        for (i of managersArray) {
          if (`${i.first_name} ${i.last_name}` === answer.manager) {
            managerID = i.id
          }
        }
        db.addEmployee(answer.first_name, answer.last_name, roleID, managerID, initialize);
      }
    });
};

const enterRole = () => {
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
        enterRole();
      } else {
        initialize();
      }

    });

};

const enterDepartment = () => {
  inquirer
    .prompt([
      { name: 'dept', type: 'input', message: "What is the department's name?" },
      { name: 'again', type: 'confirm', message: "Would you like to add another department?" },
    ])
    .then((answer) => {
      console.log(`Added Department: ${answer.dept} to the database.`);

      if (answer.again) {
        enterDepartment();
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

