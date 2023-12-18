const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    // const order = await models.Order.findByPk(id,{
    //   include: ['customer']
    // });
    const order = await models.Order.findByPk(id,{
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if(!order){
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
