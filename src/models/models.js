// const mongoose = require('mongoose');
// const taskSchema = require('../models/taskModel');
//
// const userSchema = mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     tasks: {
//         type: [taskSchema],
//         required: false
//     }
// });
//
// module.exports.userModel = mongoose.model('userModel', userSchema);

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    const Tasks = sequelize.define('Tasks', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: DataTypes.STRING,
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    User.hasMany(Tasks);
    Tasks.belongsTo(User, {
        onDelete: 'CASCADE',
        foreignKey: {
            allowNull: false
        }
    });
    sequelize.sync();
}