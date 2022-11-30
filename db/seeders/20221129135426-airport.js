'use strict';

const timestamp = new Date();
const airports_list = [
  {
    name: 'Soekarno Hatta Airport',
    city: 'Jakarta',
    country: 'Indonesia',
    country_code: 'IDN',
    createdAt: timestamp,
    updatedAt: timestamp
  },
  {
    name: 'Halim Airport',
    city: 'Jakarta',
    country: 'Indonesia',
    country_code: 'IDN',
    createdAt: timestamp,
    updatedAt: timestamp
  }
]

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
    const airports = airports_list.map(airport => {
      return airport;
    })

    await queryInterface.bulkInsert('Airports', airports, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airports', null, {});
  }
};
