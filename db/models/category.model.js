//hacemos nuestras importaciones con Sequelize
const {Model, DataTypes, Sequelize} = require('sequelize');

//por buena practica, definimos el nombre de nuestra tabla
const CATEGORY_TABLE = 'categories';
//ahora definimos el schema d ela base de datos
const CategorySchema = {
  id: { //definimos la estructura del campo id
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique:true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt:{
    allowNull:false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion para bases de datos se usa el nombre asi, no camelCase como javaScript
    defaultValue: Sequelize.NOW
  }
};

//ahora, definimos una clase con nuestro modelo, lo que nos permite Sequelize
//este modelo, es el que tiene las formas que nos permiten hacer queries, como find
class Category extends Model {
  //creamos unos metodos estaticos, no necesitamos una declaracion del objeto para acceder a ellos
  static associate(models){
    this.hasMany(models.Product, {
      as: 'products',  //este alias me sirve para resolver queries anidados
      foreignKey: 'categoryId'
    });
  }
  //va a recibir una conexion
  static config (sequelize){
    return { //retornamos la configuracion
      sequelize, //la conexion
      tableName: CATEGORY_TABLE, //nombre de la table
      modelName: 'Category', //igual que la clase
      timestamps: false, //de momento lo dejaremos false
    }
  }
};

module.exports = { CATEGORY_TABLE, CategorySchema, Category};
