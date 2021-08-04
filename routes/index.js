const express = require('express');
const {check, validationResult} = require('express-validator');
const doneRoute = require('./done');

const router = express.Router();

module.exports = params => {
    const { todoTaskService, doneTaskService } = params;

    router.get('/', async (req, res, next) => {
        try {
            const tasksTodo = await todoTaskService.getList();

            const error = req.session.taskList ? req.session.taskList.error : false;
            const success = req.session.taskList ? req.session.taskList.success : false;
            req.session.taskList = {};

            return res.render('layout', {
                pageTitle: 'TODO',
                template: 'index',
                tasksTodo,
                error,
                success
            });

        } catch (err) {
            return next(new Error('Error!', err.message));
        }
    });

    router.post('/', [
        check('task')
            .trim()
            .isLength({min: 3})
            .escape()
            .withMessage('Minimal length for task name is 3 letter!')
    ], async (req, res, next) => {
        try {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                req.session.taskList = {
                    error: error.array()[0].msg
                }

                return res.redirect('/');
            }

            const {task} = req.body;
            const taskExists = (await todoTaskService.getList())
                .some(oldTask => oldTask.name.toLowerCase() === task.trim().toLowerCase());

            if (taskExists) {
                req.session.taskList = {
                    error: `Task '${task}' already exists!`
                }

                return res.redirect('/');
            }
            const id = (await todoTaskService.getList()).length;
            await todoTaskService.addEntry(task, id);
            req.session.taskList = {
                success: true
            }

            return res.redirect('/');

        } catch (err) {
            return next(new Error('Error!', err.message));
        }
    });

    router.post('/api/tasks/:taskName/done',
        async (req, res, next) => {
            try {
                const taskName = req.params.taskName;
                const doneList = await doneTaskService.getList();

                await todoTaskService.deleteEntry(taskName);
                await doneTaskService.addEntry(taskName, doneList.length);

                return res.redirect('/');

            } catch (err) {
                return next(new Error('Error!', err.message));
            }
        });

    router.use('/done', doneRoute(params));

    return router;
}

