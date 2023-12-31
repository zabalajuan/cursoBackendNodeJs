//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

const {CUSTOMER_TABLE} = require('./customer.model');
//por buena practica, definimos el nombre de nuestra tabla
const ORDER_TABLE = 'orders';
//ahora definimos el schema d ela base de datos
const OrderSchema = {
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
  customerId:{
    field: 'customer_id',
    allowNull: false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
    type: DataTypes.INTEGER,
    references: { //aquí es donde le diremos a qué está asociado
      model: CUSTOMER_TABLE,
      key: 'id' //Hacia donde estará referido en la otra tabla
    },
    onUpdate: 'CASCADE',  //comportamiento cuando se actualiza el usuario
    onDelete: 'SET NULL'  //comportamiento cuando se elimine un usuario
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(){
      if (this.items.length > 0){ //items es el nombre que le dimos a la asociacion
        //usaremos la formula reduce de los arrays, que nos permite reducir todo a un solo valor, el total
        //este calculo no es recomendado si hay muchos datos
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        },0)
      }
      return 0;
    }
  }

};

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class Order extends Model {
  //creamos unos metodos estaticos, no necesitamos una declaracion del objeto para acceder a ellos
  static associate(models){
    this.belongsTo(models.Customer, {
      as: 'customer',  //este alias me sirve para resolver queries anidados
    });
    this.belongsToMany(models.Product,{
      as: 'items',                    //el alias de la asociacion
      through: models.OrderProduct,   //le estamos indicando la tabla ternaria que tiene la relacion
      foreignKey: 'orderId',          //esta es la llave que resuelve la relacion
      otherKey: 'productId'           // esta es la otra llave de la tabla ternaria
    })
  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: ORDER_TABLE, //nombre de la table
      modelName: 'Order', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
};

module.exports = { ORDER_TABLE, OrderSchema, Order};
