'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    CustomerId: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    delivery_date: DataTypes.DATE,
    total_cost: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM,
      values: [
        'created',
        'in progress',
        'delivered'
      ],
      defaultValue: 'created'
    }
  }, {
    timestamps: true
  });
  Orders.associate = function(models) {
    Orders.belongsTo(models.Customers, {
      as: 'Customer'
    });
    Orders.belongsToMany(models.Products, {
      as: 'Products',
      through: 'Order_Products'
    });
  };
  return Orders;
};