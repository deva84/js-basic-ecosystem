require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'yahoo';

const Models = require('../models/Relations')();
const User = Models.User;
const Task = Models.Task;

class UsersService {

    async registerUser(email, password) {
        const duplicate = await User.findOne({
            where: {email: email}
        });
        if (duplicate) return false;

        try {
            await User.create({
                email: email,
                password: await bcrypt.hash(password, 10)
            });
        } catch(err) {
            throw new Error(err);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await User.findOne({
                where: {email: email}
            });
            if (!user || !(await bcrypt.compare(password, user.password)) ) return false;
            const token = jwt.sign({ email: user.email, _id: user._id}, jwtSecret);
            return {user: {email: user.email}, token: token};
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = { UsersService, User, Task };