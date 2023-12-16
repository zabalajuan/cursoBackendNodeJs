//importamos la libreria de pg -> node-postgres
const {Pool} = require('pg');

//pg internamente con la primera conexion genera un await, por lo cual ya no es necesario que lo manejemos asi
//una vez genera su await interno, reparte las conexiones cuando se requiere.

//Importamos las credenciales
const {config} = require('./../config/config');

//una buena practica es mandar una url con todo el esquema de conexion
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//Crearemos la URL de conexion
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({connectionString: URI});
  //configuración de la conexion
  //como lo estamos corriendo con docker, le ponemos local
  // host:'localhost',
  // port:5432, //donde esta corriendo la base de datos, puerto local
  // user: 'akira',
  // password:'admin123',
  // database:'my_store' // nombre d ela base de datos

  //ya no es necesario pasarle los datos como arriba




//ya no hay necesidad de crear una conexion, la primera que se genera, genera la conexion para el resto
module.exports = pool;
