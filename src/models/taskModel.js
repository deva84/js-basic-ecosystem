const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = taskSchema;
module.exports.taskModel = mongoose.model('taskModel', taskSchema);