'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplane_name: {
        type: Sequelize.STRING
      },
      departure_time: {
        type: Sequelize.DATE
      },
      arrival_time: {
        type: Sequelize.DATE
      },
      return_time: {
        type: Sequelize.DATE
      },
      arrival2_time: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};