'use strict';
const faker = require('faker');
const times = require("lodash.times");

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('customers', 
      times(10, () => ({
        name: faker.name.firstName()+' '+faker.name.lastName(),
        email: faker.internet.email(),
        street_address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip_code: faker.address.zipCode(),
        country: faker.address.countryCode(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),

      })), 
    {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('customers', null, {});
  }
};
