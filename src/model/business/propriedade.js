const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');


const Propriedade = sequelize.define('Propriedade',
  {
    idPropriedade: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomePropriedade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cadastroRural: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    //sequelize: sequelize,  // Passing the connection instance
    //modelName: 'Propriedade',
    tableName: 'propriedade',
    timestamps: false,
  },
);


module.exports = Propriedade;
