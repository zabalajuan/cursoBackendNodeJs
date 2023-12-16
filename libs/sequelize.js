const {Sequelize} = require('sequelize');
const {config} = require('./../config/config');

//debemos pasarle los datos de nuestra conexion
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//creamos una instancia de sequelize, por detras utiliza la estrategia de pooling
const sequelize = new Sequelize(URI,{
  dialect: 'postgres', //que base de datos usamos
  logging:true,  //en consola nos muestra el resultado en comando SQL cada vez que se hace una consulta con el ORM
});

module.exports = sequelize;
