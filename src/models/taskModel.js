const {DataTypes} = require('sequelize');
const sequelize = require('../connection').sequelize;

module.exports.Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
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
