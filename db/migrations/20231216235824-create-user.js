'use strict';

const {UserSchema, USER_TABLE} = require('./../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // esta es la configuracion de subir cambios
  async up (queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },
  //esta es la configuracion de revertir cambios
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE)
  }
};
