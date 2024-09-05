"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        type: Sequelize.STRING,
      },
      client_fio: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phoneNumbers: {
        type: Sequelize.TEXT,
      },
      size: {
        type: Sequelize.STRING,
      },
      volume: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      sum: {
        type: Sequelize.FLOAT,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      dateStart: {
        type: Sequelize.DATE,
      },
      dateEnd: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      routeID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Routes", // имя таблицы, к которой создается связь
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
