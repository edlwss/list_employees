const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Department = require('./departament.model');
const Position = require('./position.model');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 50] }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 50] }
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { len: [2, 50] }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
    },
    passportSeries: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [4] }
    },
    passportNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6] }
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [11] }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [10, 200] }
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


User.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Department.hasMany(User, { foreignKey: 'departmentId', as: 'users' });

User.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });
Position.hasMany(User, { foreignKey: 'positionId', as: 'users' });

module.exports = User;
