const { Task } = require('./TaskModel');
const { User } = require('./UserModel');

module.exports = () => {
    User.hasMany(Task, { as: "Tasks", foreignKey: "userId" });
    Task.belongsTo(User, { as: "Users", foreignKey: "userId" });

    return { Task, User };
};