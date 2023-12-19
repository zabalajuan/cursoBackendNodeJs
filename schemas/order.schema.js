const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),

});

//esto deberíamos haberlo resuelto como un schema propio para items
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),

});
// const updateOrderSchema = Joi.object({
//   //
// });


module.exports = { createOrderSchema, getOrderSchema , addItemSchema}
