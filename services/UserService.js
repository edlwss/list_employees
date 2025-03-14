const User = require('../models/user.model'); 
const Department = require('../models/departament.model');
const Position = require('../models/position.model');

class UserService {
    async getAllUsers() {
        return await User.findAll({
            include: [
                { model: Department, as: 'department' },
                { model: Position, as: 'position' }
            ]
        });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async getUserById(id) {
        return await User.findByPk(id, {
            include: [
                { model: Department, as: 'department' },
                { model: Position, as: 'position' }
            ]
        });
    }

    async updateUser(id, newData) {
        return await User.update(newData, { where: { id } });
    }

    async getAllDepartments() {
        return await Department.findAll();
    }

    async getAllPositions() {
        return await Position.findAll();
    }
}
module.exports = new UserService();
