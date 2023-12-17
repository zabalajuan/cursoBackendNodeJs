'use strict';
const {DataTypes} = require('sequelize');

const {CUSTOMER_TABLE} = require('./../models/customer.model');

module.exports = {
  // esta es la configuracion de subir cambios
  async up (queryInterface) {

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id',{
      field: 'user_id',
      allowNull:false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
      type: DataTypes.INTEGER,
      unique: true, //solo un customer por user
    });
  },
  //esta es la configuracion de revertir cambios
  async down (queryInterface) {
    // await queryInterface.dropTable(CUSTOMER_TABLE)
  }
};
