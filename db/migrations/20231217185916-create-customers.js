'use strict';

const {CustomerSchema, CUSTOMER_TABLE} = require('./../models/customer.model');

module.exports = {
  // esta es la configuracion de subir cambios
  async up (queryInterface) {

    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },
  //esta es la configuracion de revertir cambios
  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
