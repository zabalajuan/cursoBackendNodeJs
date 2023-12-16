const {Sequelize} = require('sequelize');
const {config} = require('./../config/config');
//importamos el modelo que hicimos
const setupModels = require('./../db/models'); //lo busca en el index


//debemos pasarle los datos de nuestra conexion
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creamos una instancia de sequelize, por detras utiliza la estrategia de pooling
const sequelize = new Sequelize(URI,{
  // dialect: 'postgres', //que base de datos usamos
  dialect: 'mysql',
  logging:true,  //en consola nos muestra el resultado en comando SQL cada vez que se hace una consulta con el ORM
});
//la funcion importada setupModels debe ser utilizada justo despues de crear la instancia
setupModels(sequelize);
//una vez hicimos el setup, debemos decirle que haga una sincronizacion
sequelize.sync();

module.exports = sequelize;
