//este archivo es el que conecta el ORM con el modelo creado
//se encarga de enviar la conexion para mapear datos
const { User, UserSchema} = require('./user.model');
const { Customer, CustomerSchema} = require('./customer.model');
const { Category, CategorySchema} = require('./category.model');
const { Product, ProductSchema} = require('./product.model');

//por parametro le estamos pasando la conexion
function setupModels(sequelize){
  //una vez reciba la conexion, debo decirle que inicie el modelo, que debe seguir un schema
  User.init(UserSchema, User.config(sequelize)); //llamamos el metodo statis sin necesidad de tener una instancia
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  //Definimos las asociaciones
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

};

module.exports = setupModels;
