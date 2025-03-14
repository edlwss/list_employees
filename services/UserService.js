const User = require('../models/user.model'); 

class UserService {
    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();
