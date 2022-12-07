'use strict';

const bcrypt = require('bcryptjs');
const { Role } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'adminnya123';
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const role = await Role.findOne({
      where: {
        name: "ADMIN",
      },
    });

    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@binar.co.id',
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
