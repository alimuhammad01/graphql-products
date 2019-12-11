'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    country: DataTypes.STRING,

  }, {
    timestamps: true
  });
  Customers.associate = function(models) {
    Customers.hasMany(models.Orders, {
      as: 'Orders',
    });
  };
  return Customers;
};