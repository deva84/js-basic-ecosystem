require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'yahoo';

const { userModel } = require('../models/userModel');

class UsersService {

    async registerUser(email, password) {
        const duplicate = await userModel.findOne({email});
        if (duplicate) return false;
        const user = new userModel({
            email,
            password: await bcrypt.hash(password, 10)
        });

        try {
            await user.save();
        } catch (err) {
            throw new Error(err);
        }

    }

    async loginUser(email, password) {
        try {
            const user = await userModel.findOne({email});
            if (!user || !(await bcrypt.compare(password, user.password)) ) return false;
            const token = jwt.sign({ email: user.email, _id: user._id}, jwtSecret);
            return {user: {email: user.email}, token: token};
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = UsersService;