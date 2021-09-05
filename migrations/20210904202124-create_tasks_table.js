'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: Sequelize.STRING,
      done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: Sequelize.INTEGER(11),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    return table;
  },

  down: async (queryInterface, Sequelize) => {
     const result = await queryInterface.dropTable('tasks');

     return result;
  }
};
