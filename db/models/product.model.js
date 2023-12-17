//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

const {CATEGORY_TABLE} = require('./category.model');
//por buena practica, definimos el nombre de nuestra tabla
const PRODUCT_TABLE = 'products';
//ahora definimos el schema d ela base de datos
const ProductSchema = {
  id: { //definimos la estructura del campo id
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt:{
    allowNull:false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion para bases de datos se usa el nombre asi, no camelCase como javaScript
    defaultValue: Sequelize.NOW
  },
  //campo definido para la relación Customer BelongsTo User
  categoryId:{
    field: 'category_id',
    allowNull:false, //todo cliente debe tener un usuario, por eso lo dejaremos en false
    type: DataTypes.INTEGER,
    references: { //aquí es donde le diremos a qué está asociado
      model: CATEGORY_TABLE,
      key: 'id' //Hacia donde estará referido en la otra tabla
    },
    onUpdate: 'CASCADE',  //comportamiento cuando se actualiza el usuario
    onDelete: 'SET NULL'  //comportamiento cuando se elimine un usuario
  }
}

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class Product extends Model {
  //creamos unos metodos estaticos, no necesitamos una declaracion del objeto para acceder a ellos
  static associate(models){
    this.belongsTo(models.Category, {as: 'category'});
  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: PRODUCT_TABLE, //nombre de la table
      modelName: 'Product', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product}
