const { DataTypes } = require('sequelize');
const sequelize = require('../connection').sequelize;

module.exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
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

// User.hasMany(Task);
// Task.belongsTo(User, {
//     onDelete: 'CASCADE',
//     foreignKey: {
//         allowNull: false
//     }
// });
// sequelize.sync();
