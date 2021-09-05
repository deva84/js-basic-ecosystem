const bcrypt = require("bcrypt");
const User = require('./UsersService').User;
const Task = require('./UsersService').Task;

class TasksService {

    constructor(email) {
        this.email = email;
    }

    async getTodoTasks() {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const tasks = await Task.findAll({
            where: {userId: user.id}
        });
        if (!tasks) return [];
        return tasks.filter(task => task.done === false);
    };

    async getCompletedTasks() {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const tasks = await Task.findAll({
            where: {userId: user.id}
        });
        if (!tasks) return [];
        return tasks.filter(task => task.done === true);
    }

    async addNewTask(title, description) {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const isDuplicate = await Task.findOne({
            where: {userId: user.id, title: title}
        });
        if (isDuplicate) return false;
        try {
            await Task.create({
                title: title,
                description: description,
                userId: user.id
            });
        } catch (err) {
            throw new Error(err);
        }
        return {title, done: false, description};
    }

    async markTaskAsCompleted(title) {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const exist = await Task.findOne({
            where: {userId: user.id, title: title}
        });
        if (!exist) return false;
        await Task.update({
            done: true
        }, {where: {title: title}});
        return true;
    }

    async updateTaskContent(oldTitle, newTitle, description) {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const isDuplicate = await Task.findOne({
            where: {userId: user.id, title: newTitle}
        });
        if (isDuplicate) return false;
        const decodedTitle = decodeURI(oldTitle);
        const exist = await Task.findOne({
            where: {userId: user.id, title: decodedTitle}
        });
        if (!exist) return 'undefined';
        await Task.update({
            title: newTitle,
            description: description
        }, {where: {title: title}});
        return true;
    }

    async deleteTask(title) {
        const user = await User.findOne({
            where: {email: this.email}
        });
        const exist = await Task.findOne({
            where: {userId: user.id, title: title}
        });
        if (!exist) return true;
        await Task.destroy({where: {userId: user.id, title: title}});
        return true;
    }
}

module.exports = TasksService;