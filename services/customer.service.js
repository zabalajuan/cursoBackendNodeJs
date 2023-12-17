const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize')

class CustomerService {
  constructor() {
    //
  }

  async create(data) {
    // // const newCustomer = await models.Customer.create(data);
    // //para creear el usuario y el customer al tiempo:
    // const newUser = await models.User.create(data.user); //aquí estamos creando el usuario nuevo, pasando los datos solo del usuario
    // const newCustomer = await models.Customer.create({
    //   ...data,  //el path que no coincida con los atributos, los va a ignorar
    //   userId: newUser.id //en este punto, si es necesario darle el userId que se acaba de generar
    //   //de esta manera en este mismo endpoint estamos creando el usuario y el cliente
    // })
    //------------------------------------------------
    //Con Sequelize y gracias a que tenemos definido el modelo y las asociaciones, podemos hacer la creación más simple
    const newCustomer = await models.Customer.create(data, {
      include:['user']  //debemos decirle de forma explicita que incluya la asociacion
    })
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'] //aquí le estamos indicando que qeuremos resolver la asociación
    });
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
