//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');

//por buena practica, definimos el nombre de nuestra tabla
const ORDER_PRODUCT_TABLE = 'orders_products';
//ahora definimos el schema d ela base de datos
const OrderProductSchema = {
  id: { //definimos la estructura del campo id
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt:{
    allowNull:false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion para bases de datos se usa el nombre asi, no camelCase como javaScript
    defaultValue: Sequelize.NOW
  },
  amount:{
    allowNull:false,
    type: DataTypes.INTEGER,
  },
  //campo definido para la relación Customer BelongsTo User
  orderId:{
    field: 'order_id',
    allowNull:false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
    type: DataTypes.INTEGER,
    references: { //aquí es donde le diremos a qué está asociado
      model: ORDER_TABLE,
      key: 'id' //Hacia donde estará referido en la otra tabla
    },
    onUpdate: 'CASCADE',  //comportamiento cuando se actualiza el usuario
    onDelete: 'SET NULL'  //comportamiento cuando se elimine un usuario
  },
  productId:{
    field: 'product_id',
    allowNull:false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
    type: DataTypes.INTEGER,
    references: { //aquí es donde le diremos a qué está asociado
      model: PRODUCT_TABLE,
      key: 'id' //Hacia donde estará referido en la otra tabla
    },
    onUpdate: 'CASCADE',  //comportamiento cuando se actualiza el usuario
    onDelete: 'SET NULL'  //comportamiento cuando se elimine un usuario
  }
}

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class OrderProduct extends Model {
  //le pasamos los modelos como parametro
  static associate(models){
    //
  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: ORDER_PRODUCT_TABLE, //nombre de la table
      modelName: 'OrderProduct', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct}
