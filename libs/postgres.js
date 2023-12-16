//importamos la libreria de pg -> node-postgres
const {Client} = require('pg');


//conectamos el cliente, esta funcion es una promesa, se debe correr de forma asincrona
// para poder llamar la funcion con await, debemos crear la funcion async
async function getConnection (){
  const client = new Client({
    //configuración de la conexion
    //como lo estamos corriendo con docker, le ponemos local
    host:'localhost',
    port:5432, //donde esta corriendo la base de datos, puerto local
    user: 'akira',
    password:'admin123',
    database:'my_store' // nombre d ela base de datos
  });
  //establecemos la conexion, teniendo en cuenta que es un promesa
  await client.connect();
  //es necesario retornar el client para que el que lo utilice pueda ejecutar consultas
  return client;
};

module.exports = getConnection;

