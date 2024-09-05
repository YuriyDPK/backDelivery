"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        productNumberDatamatrix: "12345",
        productName: "Product A",
        size: "M",
        volume: "1L",
        price: 10.0,
        quantity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderID: 5,
        status: "не отсканирован",
      },
      {
        productNumberDatamatrix: "67890",
        productName: "Product B",
        size: "L",
        volume: "2L",
        price: 15.0,
        quantity: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
        orderID: 6,
        status: "не отсканирован",
      },
      // Добавьте ещё 8 продуктов
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
