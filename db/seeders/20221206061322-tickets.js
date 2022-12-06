'use strict';

const dayjs = require('dayjs');

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
    const generateRandomInt = () => {
      return '' + Math.floor(1 + Math.random() * 9);
    };

    const generateRandomIntForPrice = (min = 10, max = 100) => {
      let diff = max - min;
      let random = Math.random();
      random = Math.floor(random * diff);
      random = random + min;
      return random;
    }

    const airplanes = [
      'Garuda Indonesia', 'Lion Air', 'Batik Air', 'Sriwijaya Air'
    ]

    const cities = [
      'Jakarta', 'Medan', 'Yogyakarta', 'Surabaya', 'Denpasar', 'Makassar', 'Palembang'
    ];

    const categories = ['one_way', 'round_trip'];

    const ticketList = [];
    categories.forEach(category => {
      airplanes.forEach(airplane => {
        cities.forEach(origin => {
          cities.forEach(destination => {
            if (origin !== destination) {
              for (let i = 0; i < 2; i++) {
                const early = dayjs().add(generateRandomInt())
                const later = early.add(generateRandomInt(), 'day').toISOString();
                ticketList.push({
                  airplane_name: airplane,
                  departure_time: early.toISOString(),
                  arrival_time: later,
                  price: generateRandomIntForPrice() + '0000',
                  category: category,
                  origin: origin,
                  destination: destination,
                  createdBy: 1,
                  updatedBy: 1,
                  createdAt: early.toISOString(),
                  updatedAt: early.toISOString(),
                })
              }
            }
          })
        })
      })
    })
    await queryInterface.bulkInsert('Tickets', ticketList, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};
