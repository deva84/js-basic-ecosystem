const express = require('express');

const router = express.Router();

module.exports = params => {
    const { doneTaskService } = params;

    router.get('/', async (req, res, next) => {
        try {
            const doneTasks = await doneTaskService.getList();
            return res.render('layout', {
                pageTitle: 'Done',
                template: 'done',
                doneTasks
            });
        } catch (err) {
            return next(new Error('Error!', err.message));
        }
    });

    return router;
}

