const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_coordinatorDB',
});
// Get data from MySQL to show all employees
const showAllEmployees = (callback) => {
    console.log('\nEmployees:\n');
    connection.query("SELECT e.id as 'ID', CONCAT(e.first_name, ' ', e.last_name) as 'Name', r.title as 'Title', d.name as 'Department', r.salary as 'Salary', CONCAT(x.first_name, ' ', x.last_name) as 'Manager' FROM employee as e LEFT JOIN role as r ON e.role_id = r.id LEFT JOIN employee as x ON e.manager_id = x.id LEFT JOIN department as d ON r.department_id = d.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}
// Get data from MySQL to show all roles
const showAllRoles = (callback) => {
    console.log('\nRoles:\n');
    connection.query("SELECT r.id as 'ID', r.title as 'Title', r.salary as 'Salary', d.name as 'Department' FROM role as r LEFT JOIN department as d ON r.department_id = d.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}
// Get data from MySQL to show all departments
const showAllDepartments = (callback) => {
    console.log('\nDepartments:\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}
// Get data about managers and roles to select when adding an employee
const getEmployeeInfo = (callback) => {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) as 'name', id as 'value' FROM employee WHERE manager_id is null", (err, managersArray) => {
        if (err) throw err;
        connection.query("SELECT title as 'name', id as 'value' FROM role", (err, rolesArray) => {
            if (err) throw err;
            callback(managersArray, rolesArray);
        });
    });
}
// Add employee to database using inquirer data
const addEmployee = (first, last, role, manager, callback) => {
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: first,
            last_name: last,
            role_id: role,
            manager_id: manager,
        },
        (err) => {
            if (err) throw err;
            console.log(`\nAdded ${first} ${last} to the database.\n`);
            callback();
        }
    );
}
// Get data about departments to select when adding a role
const getRoleInfo = (callback) => {
    connection.query("SELECT name, id as 'value' from department", (err, deptArray) => {
        if (err) throw err;
        callback(deptArray);
    });
}
// Add role to database using inquirer data
const addRole = (title, salary, dept, callback) => {
    connection.query(
        'INSERT INTO role SET ?',
        {
            title: title,
            salary: salary,
            department_id: dept,
        },
        (err) => {
            if (err) throw err;
            console.log(`\nAdded Role: ${title} to the database.\n`);
            callback();
        }
    );
}
// Add department to database using inquirer data
const addDepartment = (name, callback) => {
    connection.query(
        'INSERT INTO department SET ?',
        { name: name },
        (err) => {
            if (err) throw err;
            console.log(`\nAdded Department: ${name} to the database.\n`);
            callback();
        }
    );
}
// Get data about roles and employees to select when updating a role
const getEmployeeUpdate = (callback) => {
    connection.query("SELECT CONCAT(first_name, ' ', last_name) as 'name', id as 'value' FROM employee", (err, employeesArray) => {
        if (err) throw err;
        connection.query("SELECT title as 'name', id as 'value' FROM role", (err, rolesArray) => {
            if (err) throw err;
            console.log(rolesArray);
            callback(employeesArray, rolesArray);
        });
    });
}
// Update employee role using inquirer data
const changeRole = (employee, role, callback) => {
    connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [ role, employee ],
        (err) => {
            if (err) throw err;
            console.log(`\nUpdated employee's role in the database.\n`);
            callback();
        }
    );
}

module.exports = {
    showAllEmployees,
    showAllRoles,
    showAllDepartments,
    getEmployeeInfo,
    addEmployee,
    getRoleInfo,
    addRole,
    addDepartment,
    getEmployeeUpdate,
    changeRole
}