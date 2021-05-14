//Load mariadb module
const mysql = require('mysql');

//Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: '12121212',
    database: 'tfg',
};

function getConnection() {
  return mysql.createConnection(config);
}

//Export the getConnection function
module.exports = getConnection;
