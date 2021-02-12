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

const addEmployees = () => {
    console.log('Adding employees...')
}
const addDepartments = () => {
    console.log('Adding departments...')
}
const addRoles = () => {
    console.log('Adding roles...')
}
const updateEmployeeRoles = () => {
    console.log('Updating employee roles...')
}

module.exports = {
    showAllEmployees,
    showAllDepartments,
    showAllRoles,
    addEmployees,
    addDepartments,
    addRoles,
    updateEmployeeRoles,
}