"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "1",
        phone: "1234567890",
        password: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane",
        phone: "0987654321",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Добавьте ещё 8 пользователей
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
