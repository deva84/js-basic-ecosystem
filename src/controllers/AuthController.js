require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'yahoo';
const UsersService = require('../services/UsersService');

async function registration(req, res) {
    const {email, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10)
    const usersService = new UsersService(email, encryptedPassword);
    const user = await usersService.getUser();
    if (user !== undefined) return res.status(400).end();

    try {
        await usersService.addNewUser();
        res.status(200).end();

    } catch (err) {
        res.status(505).end();
    }
}

async function login(req, res) {
    const {email, password} = req.body;
    if (!password || !email) return res.status(400).end();
    const usersService = new UsersService(email, password);
    const user = await usersService.getUser();
    if (user === undefined) return res.status(400).end();


    try {
        if (!(await bcrypt.compare(password, user.password))) return res.status(400).end();
        const token = jwt.sign({email: user.email}, jwtSecret);

        res.status(200).json({user: {email: user.email}, token: token});

    } catch (err) {
        res.status(505).end();
    }

}

module.exports = {registration, login};