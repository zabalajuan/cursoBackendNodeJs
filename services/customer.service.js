const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize')

class CustomerService {
  constructor() {
    //
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll();
    return rta; //aquí con esta forma de consulta estamos usando programación orientada a objetos
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    // const user = await models.User.findByPk(id);
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
