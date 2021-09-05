const Sequelize = require("sequelize");
const config = require("../src/config");

const sequelize = new Sequelize(config.options);
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;