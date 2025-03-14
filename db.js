const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('list_emp', 'postgres', '2904', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
