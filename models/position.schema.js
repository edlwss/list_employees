const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Position = sequelize.define('Position', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [2, 100] }
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 }
    }
}, {
    tableName: 'positions',
    timestamps: false
});

module.exports = Position;
