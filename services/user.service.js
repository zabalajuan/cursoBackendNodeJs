const boom = require('@hapi/boom');
//importamos el pg
// const getConnection = require('../libs/postgres');
// const pool = require('../libs/postgres.pool');
//importamos sequelize, cada vez que hacemos esta importacion, sequelize genera un models
const {models} = require('./../libs/sequelize')

class UserService {
  constructor() {
    // this.pool = pool; //que genere el pool de node-postgres
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    // const query = 'SELECT * FROM tasks'
    // //ejecutamos la conexion
    // // const client =await getConnection();
    // //empezamos a realizar consultas
    // // const rta = await client.query('SELECT * FROM tasks');
    // const rta = await this.pool.query(query);
    // return rta.rows;
    const rta = await models.User.findAll();
    return rta; //aquí con esta forma de consulta estamos usando programación orientada a objetos
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    // const user = await models.User.findByPk(id);
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
