'use strict';

const {OrderProductSchema, ORDER_PRODUCT_TABLE} = require('./../models/order-product.model');

module.exports = {
  // esta es la configuracion de subir cambios
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },
  //esta es la configuracion de revertir cambios
  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
