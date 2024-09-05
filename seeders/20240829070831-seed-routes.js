"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Routes", [
      {
        number: 101,
        points: 3,
        status: "Выполнено",
        date: "2024-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: 102,
        points: 5,
        status: "В работе",
        date: "2024-02-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: 104,
        points: 5,
        status: "В работе",
        date: "2024-08-29",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: 105,
        points: 3,
        status: "Выполнено",
        date: "2024-08-29",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Добавьте ещё 8 маршрутов
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Routes", null, {});
  },
};
