'use strict';
const faker = require('faker');
const times = require("lodash.times");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', 
      times(10, () => ({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        status: faker.random.boolean() ? '1': '0',
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),

      })), 
    {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('products', null, {});
  }
};
