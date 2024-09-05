"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", [
      {
        orderNumber: "001",
        client_fio: "John Doe",
        address: "Address 1",
        phoneNumbers: "1234567890",
        size: "M",
        volume: "1L",
        quantity: 2,
        sum: 20.0,
        comment: "None",
        dateStart: new Date(),
        dateEnd: new Date(),
        status: "В работе",
        routeID: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderNumber: "002",
        client_fio: "Jane Doe",
        address: "Address 2",
        phoneNumbers: "0987654321",
        size: "L",
        volume: "2L",
        quantity: 1,
        sum: 15.0,
        comment: "Urgent",
        dateStart: new Date(),
        dateEnd: new Date(),
        status: "Выполнено",
        routeID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Добавьте ещё 8 заказов
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
