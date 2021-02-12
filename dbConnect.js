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
    console.log('\nEmployees:\n')
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}
// Get data from MySQL to show all roles
const showAllRoles = (callback) => {
    console.log('\nRoles:\n');
    connection.query('SELECT * FROM role', (err, res) => {
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
    connection.query('SELECT * FROM employee WHERE manager_id is null', (err, managersArray) => {
        if (err) throw err;
        connection.query('SELECT * FROM role', (err, rolesArray) => {
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
            console.log(`Added ${first} ${last} to the database.`);
            callback();
        }
    );
}
// Get data about departments to select when adding a role
const getRoleInfo = (callback) => {
    connection.query('SELECT * FROM department', (err, deptArray) => {
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
            console.log(`Added Role: ${title} to the database.`);
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
            console.log(`Added Department: ${name} to the database.`);
            callback();
        }
    );
}
const updateEmployeeRoles = () => {
    console.log('Updating employee roles...')
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
    updateEmployeeRoles,
}