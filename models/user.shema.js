const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [5, 100] }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
    },
    passportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^\d{4}-\d{6}$/ } // Формат 4 цифры - 6 цифр
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^\+?\d{1,3}[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/ }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [10, 200] } // Ограничение по длине адреса
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2), // Денежный формат, 10 знаков всего, 2 после запятой
        allowNull: false,
        validate: { min: 0 }
    },
    hireDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }

}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
