const mongoose = require('mongoose');
const taskSchema = require('../models/taskModel');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema],
        required: false
    }
});

module.exports.userModel = mongoose.model('userModel', userSchema);