

const UsersService = require('../services/UsersService');

async function registration(req, res) {
    const {email, password} = req.body;
    const usersService = new UsersService();

    try {
        const result = await usersService.registerUser(email, password);
        if (result) return res.status(400).end();
        res.status(200).end();
    } catch(err) {
        res.status(505).end();
    }
}

async function login(req, res) {
    const {email, password} = req.body;
    if (!password || !email) return res.status(400).end();
    const usersService = new UsersService();

    try {
        const result = await usersService.loginUser(email, password);
        if (!result) return res.status(400).end();
        res.status(200).json(result);
    } catch (err) {
        res.status(505).json(err).end();
    }
}

module.exports = {registration, login};