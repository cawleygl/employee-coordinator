const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_coordinatorDB',
});

const showAllEmployees = (callback) => {
    console.log('\nEmployees:\n')
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}

const showAllDepartments = (callback) => {
    console.log('\nDepartments:\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}

const showAllRoles = (callback) => {
    console.log('\nRoles:\n');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        callback();
    });
}

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

const addDepartment = () => {
    console.log('Adding departments...')
}
const addRole = () => {
    console.log('Adding roles...')
}
const updateEmployeeRoles = () => {
    console.log('Updating employee roles...')
}

const getEmployeeInfo = (callback) => {
    connection.query('SELECT * FROM employee WHERE manager_id is null', (err, managersArray) => {
        if (err) throw err;
        connection.query('SELECT * FROM role', (err, rolesArray) => {
            if (err) throw err;
            callback(managersArray, rolesArray);
        });
    });
}

module.exports = {
    showAllEmployees,
    showAllDepartments,
    showAllRoles,
    addEmployee,
    addDepartment,
    addRole,
    updateEmployeeRoles,
    getEmployeeInfo,
}