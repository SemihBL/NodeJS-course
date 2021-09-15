// DATABASE CONNECTION WITHOUT "Sequelize ORM" JUST MYSQL

// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-app',
//     password: 'coffee_Bean0+!'
// });

// module.exports = connection.promise();

// DATABASE CONNECTION WITH "Sequelize ORM"

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-app', 'root', 'coffee_Bean0+!', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;