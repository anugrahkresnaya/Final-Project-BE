'use strict';

const bcrypt = require('bcryptjs');
const { Role } = require('../../app/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "adminnya123";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const role = await Role.findOne({
      where: {
        name: "ADMIN",
      },
    });

    await queryInterface.bulkInsert('Users', [{
      noKtp: "1218033502040005",
      username: "adminC10",
      name: "Admin",
      contact: "0616854689",
      dateOfBirth: "01-01-2001",
      address: "Binar Academy",
      photoProfile: "https://res.cloudinary.com/dd93u8fa5/image/upload/v1671182747/Binar%20Academy/monyet_esp40t.jpg",
      email: "admin@binar.co.id",
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
