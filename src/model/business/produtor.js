const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');


class Produtor extends Model {};

Produtor.init(
  {
    idProdutor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeProdutor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpfProdutor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,  // Passing the connection instance
    modelName: 'Produtor',
    tableName: 'produtor',
    timestamps: false,
  },
);


module.exports = Produtor;
