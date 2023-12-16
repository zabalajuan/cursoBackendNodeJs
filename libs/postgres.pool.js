//importamos la libreria de pg -> node-postgres
const {Pool} = require('pg');

//pg internamente con la primera conexion genera un await, por lo cual ya no es necesario que lo manejemos asi
//una vez genera su await interno, reparte las conexiones cuando se requiere.

const pool = new Pool({
  //configuración de la conexion
  //como lo estamos corriendo con docker, le ponemos local
  host:'localhost',
  port:5432, //donde esta corriendo la base de datos, puerto local
  user: 'akira',
  password:'admin123',
  database:'my_store' // nombre d ela base de datos
});

//ya no hay necesidad de crear una conexion, la primera que se genera, genera la conexion para el resto
module.exports = pool;
