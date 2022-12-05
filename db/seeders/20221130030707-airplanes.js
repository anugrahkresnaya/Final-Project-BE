'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        name: 'Garuda Indonesia',
        code: 'GIA',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sriwijaya Air',
        code: 'SJY',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Batik Air',
        code: 'BTK',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Air Japan',
        code: 'AJX',
        country: 'Japan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Japan Airlines',
        code: 'JAL',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', null, {});
  }
};
