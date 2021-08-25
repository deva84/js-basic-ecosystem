const TasksService = require('../services/TasksService');

async function getAllTasks(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const taskList = await taskService.getTodoTasks();
            res.status(200).json(taskList);
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

async function postNewTask(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const { title, description } = req.body;
            if (!title || !description) return res.status(400).end();
            const result = await taskService.addNewTask(title, description);
            if (!result) return res.status(400).end();
            res.status(201).json(result);
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

async function postTaskAsCompleted(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const title = req.body.title;
            if (!title) return res.status(400).end();
            const result = await taskService.markTaskAsCompleted(title)
            if (!result) return res.status(404).end();
            res.status(200).json(result);
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

async function getCompletedTasks(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const taskList = await taskService.getCompletedTasks();
            res.status(200).json(taskList);
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

async function putUpdatedTask(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const { title, description } = req.body;
            if(!description) return res.status(400).end();
            const result = await taskService.updateTaskContent(req.params.taskTitle, title, description);
            if (!result) return res.status(400).end();
            if (result === 'undefined') return res.status(404).end();
            res.status(200).end();
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

async function deleteTask(req, res) {
    if (req.user) {
        try {
            const taskService = new TasksService(req.user.email);
            const title  = req.body.title;
            if(!title) return res.status(400).end();
            await taskService.deleteTask(title);
            res.status(204).end();
        } catch (err) {
            res.status(400).end();
        }
    } else {
        res.status(401).end();
    }
}

module.exports = { getAllTasks, postNewTask, postTaskAsCompleted, getCompletedTasks, putUpdatedTask, deleteTask }

