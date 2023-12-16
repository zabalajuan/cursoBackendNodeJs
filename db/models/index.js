//este archivo es el que conecta el ORM con el modelo creado
//se encarga de enviar la conexion para mapear datos
const { User, UserSchema} = require('./user.model');

//por parametro le estamos pasando la conexion
function setupModels(sequelize){
  //una vez reciba la conexion, debo decirle que inicie el modelo, que debe seguir un schema
  User.init(UserSchema, User.config(sequelize)); //llamamos el metodo statis sin necesidad de tener una instancia

};

module.exports = setupModels;
