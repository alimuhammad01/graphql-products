'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM,
      values: ['1', '0'],
      defaultValues: '1'
    }
  }, {
    timestamps: true
  });
  Products.associate = function(models) {
    Products.belongsToMany(models.Orders, {
      as: 'Order',
      through: 'OrderProducts'
    })
  };
  return Products;
};