'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProducts = sequelize.define('OrderProducts', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  OrderProducts.associate = function(models) {
    OrderProducts.belongsTo(models.Products,{
    });
    OrderProducts.belongsTo(models.Orders, {
    });
  };
  return OrderProducts;
};