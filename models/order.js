"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      orderNumber: DataTypes.STRING,
      client_fio: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumbers: DataTypes.TEXT,
      size: DataTypes.STRING,
      volume: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      sum: DataTypes.FLOAT,
      comment: DataTypes.TEXT,
      dateStart: DataTypes.DATE,
      dateEnd: DataTypes.DATE,
      status: DataTypes.STRING,
      routeID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.associate = function (models) {
    Order.belongsTo(models.Route, { foreignKey: "routeID" });
  };
  return Order;
};
