"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productNumberDatamatrix: DataTypes.STRING,
      productName: DataTypes.STRING,
      size: DataTypes.STRING,
      volume: DataTypes.STRING,
      price: DataTypes.FLOAT,
      status: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      orderID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Order, { foreignKey: "orderID" });
  };
  return Product;
};
