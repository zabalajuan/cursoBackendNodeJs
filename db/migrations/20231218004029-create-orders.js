'use strict';

const {OrderSchema, ORDER_TABLE} = require('./../models/order.model');

module.exports = {
  // esta es la configuracion de subir cambios
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  },
  //esta es la configuracion de revertir cambios
  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
