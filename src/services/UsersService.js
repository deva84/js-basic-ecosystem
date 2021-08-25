const {readFile, writeFile} = require('fs');
const {promisify} = require('util');
const path = require('path');

const readDataFile = promisify(readFile);
const writeDataFile = promisify(writeFile);

const dataFile = path.resolve(__dirname, '../data/database.json');

class UsersService {

    constructor(userEmail, password) {
        this.userEmail = userEmail;
        this.password = password;
    }

    async parseDataFile() {
        const data = await readDataFile(dataFile, 'utf-8');
        return JSON.parse(data);
    }

    async getUser() {
        const parsedData = await this.parseDataFile();
        return parsedData.users.find(user => user.email === this.userEmail);
    }

    async addNewUser() {
        const data = await this.parseDataFile();
        data.users.push({email: this.userEmail, password: this.password, tasks: []})

        return writeDataFile(dataFile, JSON.stringify(data));
    }
}

module.exports = UsersService;