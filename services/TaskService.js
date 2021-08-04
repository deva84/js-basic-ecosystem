const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readDataFile = promisify(readFile);
const writeDataFile = promisify(writeFile);

class TaskService {

    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getList() {
        const data = await readDataFile(this.dataFile, 'utf-8');
        const tasks = JSON.parse(data).tasks;
        if (tasks.length === 0) return false;
        return  tasks.map(task => {
            return {
                id: task.id,
                name: task.name
            };
        }).sort((a, b) => (b.id - a.id));
    };

    async addEntry(name, id) {
        const data = JSON.parse(await readDataFile(this.dataFile, 'utf-8'));
        data.tasks.unshift({ id, name });
        return writeDataFile(this.dataFile, JSON.stringify(data));
    }

    async deleteEntry(name) {
        const data = JSON.parse(await readDataFile(this.dataFile, 'utf-8'));
        const index = data.tasks.findIndex(task => task.name === name);
        if (index > -1) {
            data.tasks.splice(index, 1);
        }
        return writeDataFile(this.dataFile, JSON.stringify(data));
    }
}

module.exports = TaskService;