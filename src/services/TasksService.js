require('dotenv').config();

const {userModel} = require('../models/userModel');

class TasksService {

    constructor(email) {
        this.email = email;
    }


    async getTodoTasks() {
        const taskList = await userModel.find({
                'email': this.email
            });
        if(!taskList[0]) return [];
        return taskList[0].tasks.filter(task => task.done === false);
    };

    async getCompletedTasks() {
        const taskList = await userModel.find({
            'email': this.email
        });
        if(!taskList[0]) return [];
        return taskList[0].tasks.filter(task => task.done === true);
    }

    async addNewTask(title, description) {
        const isDuplicate = await userModel.findOne({'email': this.email, 'tasks.title': title})
        if (isDuplicate) return false;
        await userModel.updateOne({'email': this.email}, {$push: {'tasks': {title, description}}})
        return {title, done: false, description};
    }

    async markTaskAsCompleted(title) {
        const exist = await userModel.findOne({'email': this.email, 'tasks.title': title});
        if (!exist) return false;
        await userModel.updateOne({
            'email': this.email,
            'tasks.title': title
        }, {$set: {'tasks.$.done': true}});
        return true;
    }

    async updateTaskContent(oldTitle, newTitle, description) {
        const isDuplicate = await userModel.findOne({'email': this.email, 'tasks.title': newTitle})
        if (isDuplicate) return false;
        const decodedTitle = decodeURI(oldTitle);
        const exist = await userModel.findOne({'email': this.email, 'tasks.title': decodedTitle});
        if (!exist) return 'undefined';
        await userModel.updateOne({
            'email': this.email,
            'tasks.title': decodedTitle
        }, {$set: {'tasks.$.title': newTitle, 'tasks.$.description': description}});
        return true;
    }

    async deleteTask(title) {
        const exist = await userModel.findOne({'email': this.email, 'tasks.title': title});
        if (!exist) return true;
        await userModel.updateOne({'email': this.email}, {$pull: {'tasks': {'title': title}}});
        return true;
    }
}

module.exports = TasksService;