const express = require('express');
const {check, validationResult} = require('express-validator');
const doneRoute = require('./done');

const router = express.Router();

module.exports = params => {
    const { todoTaskService } = params;

    router.get('/', async (req, res, next) => {
        try {
            const tasksTodo = await todoTaskService.getList();
            return res.render('layout', {
                pageTitle: 'TODO',
                template: 'index',
                tasksTodo
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
            .withMessage('A task name is required and should be > 3 characters length')
    ], async (req, res, next) => {
       // try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                req.session.taskList = {
                    errors: errors.array()
                }
                return res.redirect('/');
            }
            const { name } = req.body;
            const id = await todoTaskService.getList().length;
            await todoTaskService.addEntry(name, id);
            req.session.taskList = {
                message: 'Task has been added!'
            }
            return res.redirect('/');
      //  } catch (err) {
           // return next(new Error('Error!', err.message));
        //}
    });


    router.use('/done', doneRoute(params));

    return router;
}

