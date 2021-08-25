const {readFile, writeFile} = require('fs');
const {promisify} = require('util');
const path = require('path');

const readDataFile = promisify(readFile);
const writeDataFile = promisify(writeFile);

const dataFile = path.resolve(__dirname, '../data/database.json');

class TasksService {

    constructor(userEmail) {
        this.userEmail = userEmail;
    }

    async parseDataFile() {
        const data = await readDataFile(dataFile, 'utf-8');
        return JSON.parse(data);
    }

    async getUser() {
        const parsedData = await this.parseDataFile();
        return parsedData.users.find(user => user.email === this.userEmail);
    }

    async getTodoTasks() {
        const user = await this.getUser();
        return user.tasks.filter(task => task.done === false);
    };

    async getCompletedTasks() {
        const user = await this.getUser();
        return user.tasks.filter(task => task.done === true);
    }

    async addNewTask(title, description) {
        const data = await this.parseDataFile();
        const index = data.users.findIndex(user => user.email === this.userEmail);
        const isDuplicate = data.users[index].tasks.some(task => task.title === title);
        if (isDuplicate) return false;
        data.users[index].tasks.push({title, description, done: false});
        await writeDataFile(dataFile, JSON.stringify(data));
        return {title, description, done: false};
    }

    async markTaskAsCompleted(title) {
        const data = await this.parseDataFile();
        const userIndex = data.users.findIndex(user => user.email === this.userEmail);
        const taskIndex = data.users[userIndex].tasks.findIndex(task => task.title === title);
        if (taskIndex < 0) return false;
        data.users[userIndex].tasks[taskIndex].done = true;
        await writeDataFile(dataFile, JSON.stringify(data));
        return true;
    }

    async updateTaskContent(oldTitle, newTitle, description) {
        const data = await this.parseDataFile();
        const userIndex = data.users.findIndex(user => user.email === this.userEmail);
        const isDuplicate = data.users[userIndex].tasks.some(task => task.title === newTitle);
        if (isDuplicate) return false;
        const taskIndex = data.users[userIndex].tasks.findIndex(task => task.title === decodeURI(oldTitle));
        if (taskIndex < 0) return 'undefined';
        data.users[userIndex].tasks[taskIndex].title = newTitle;
        data.users[userIndex].tasks[taskIndex].description = description;
        await writeDataFile(dataFile, JSON.stringify(data));
        return true;
    }

    async deleteTask(title) {
        const data = await this.parseDataFile();
        const userIndex = data.users.findIndex(user => user.email === this.userEmail);
        const taskIndex = data.users[userIndex].tasks.findIndex(task => task.title === title);
        if (taskIndex < 0) return true;
        data.users[userIndex].tasks.splice(taskIndex, 1);
        await writeDataFile(dataFile, JSON.stringify(data));
        return true;
    }
}

module.exports = TasksService;