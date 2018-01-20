'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_title: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      available_slots: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      event_link: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};