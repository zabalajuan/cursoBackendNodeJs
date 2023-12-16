const boom = require('@hapi/boom');
//importamos el pg
const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    //ejecutamos la conexion
    const client =await getConnection();
    //empezamos a realizar consultas
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
