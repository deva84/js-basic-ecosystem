const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readDataFile = promisify(readFile);

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
        data.unshift({ name, id });
        return writeFile(this.dataFile, JSON.stringify(data));
    }
}

module.exports = TaskService;