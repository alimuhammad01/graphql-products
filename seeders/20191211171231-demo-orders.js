'use strict';
const faker = require('faker');
const times = require("lodash.times");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let orders = [];
    for(let i = 0; i < 10; i++) {
      const customer = await queryInterface.sequelize.query('SELECT id FROM customers ORDER BY RAND() LIMIT 1', { type: queryInterface.sequelize.QueryTypes.SELECT});
      orders.push({
        customer_id: customer[0].id,
        created_date: faker.date.past(),
        delivery_date: faker.date.future(),
        total_cost: faker.commerce.price(),
        status: faker.random.arrayElement(["created", "in progress", "delivered"]),
        updatedAt: faker.date.recent(),
        createdAt: faker.date.past()
      });
    }
    return queryInterface.bulkInsert('orders', 
    orders, 
  {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('customers', null, {});
  }
};
