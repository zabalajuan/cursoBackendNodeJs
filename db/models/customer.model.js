//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

const {USER_TABLE} = require('./user.model');

//por buena practica, definimos el nombre de nuestra tabla
const CUSTOMER_TABLE = 'customers';
//ahora definimos el schema d ela base de datos
const CustomerSchema = {
  id: { //definimos la estructura del campo id
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName:{
    allowNull:false,
    type: DataTypes.STRING,
    field:'last_name'
  },
  phone:{
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull:false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion para bases de datos se usa el nombre asi, no camelCase como javaScript
    defaultValue: Sequelize.NOW
  },
  //campo definido para la relación Customer BelongsTo User
  userId:{
    field: 'user_id',
    allowNull:false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
    type: DataTypes.INTEGER,
    unique: true, // no puede haber dos customers con el mismo user
    references: { //aquí es donde le diremos a qué está asociado
      model: USER_TABLE,
      key: 'id' //Hacia donde estará referido en la otra tabla
    },
    onUpdate: 'CASCADE',  //comportamiento cuando se actualiza el usuario
    onDelete: 'SET NULL'  //comportamiento cuando se elimine un usuario
  }
}

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class Customer extends Model {
  //le pasamos los modelos como parametro
  static associate(models){
    //esta clase tendra una asociacion
    this.belongsTo(models.User, {as: 'user'});

  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: CUSTOMER_TABLE, //nombre de la table
      modelName: 'Customer', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer}
