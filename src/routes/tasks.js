const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllTasks, postNewTask, postTaskAsCompleted, getCompletedTasks, putUpdatedTask,
    deleteTask
} = require('../controllers/TasksController')
const {validateBodyParams} = require("../middleware/validationMiddleware");

router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, validateBodyParams, postNewTask);
router.post('/done', authMiddleware, validateBodyParams, postTaskAsCompleted);
router.get('/done', authMiddleware, getCompletedTasks);
router.put('/:taskTitle', authMiddleware, validateBodyParams, putUpdatedTask);
router.delete('/',  authMiddleware, validateBodyParams, deleteTask);

module.exports = router;