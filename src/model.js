const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    done: {
        type: Boolean,
        default: false
    }
});

module.exports.Tasks = mongoose.model('tasks12', taskSchema);
