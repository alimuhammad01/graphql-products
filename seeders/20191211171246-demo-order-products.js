'use strict';
const faker = require('faker');
const times = require("lodash.times");

module.exports = {
  up: (queryInterface, Sequelize) => {
   
   return queryInterface.bulkInsert('order_products', 
   times(10, () => ({
      ProductId: faker.random.number({min:1,max:10}),
      OrderId: faker.random.number({min:1,max:10}),
      qty: faker.random.number({min:1,max:5})
    })
  ), 
 {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('order_products', null, {});
  }
};
