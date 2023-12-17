//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

//por buena practica, definimos el nombre de nuestra tabla
const USER_TABLE = 'users';
//ahora definimos el schema d ela base de datos
const UserSchema = {
  id: { //definimos la estructura del campo id
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: { //definimos la estructura del campo id
    allowNull: false,
    type: DataTypes.STRING,
    unique:true,
  },
  password: { //definimos la estructura del campo id
    allowNull: false,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt:{
    allowNull:false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion para bases de datos se usa el nombre asi, no camelCase como javaScript
    defaultValue: Sequelize.NOW
  }
}

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class User extends Model {
  //creamos unos metodos estaticos, no necesitamos una declaracion del objeto para acceder a ellos
  static associate(models){
    //para que la relación quede indicada en ambos, customer|user, vamos a usar un hasOne
    this.hasOne(models.Customer, {
      as: 'customer', //este es el alias, para las consultas anidadas por ejemplo
      foreignKey: 'userId'  //aquí le indicamos como lo va a encontrar, con que campo
    })
  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: USER_TABLE, //nombre de la table
      modelName: 'User', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User}
