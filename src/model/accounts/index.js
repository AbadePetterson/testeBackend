const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');


class Usuario extends Model {};

Usuario.init(
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomeUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senhaUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   field: 'first_name',
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   field: 'first_name',
    //   allowNull: true,
    //   field: 'last_name',
    // },
    // isActive: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    //   field: 'is_active',
    // }
  },
  {
    sequelize: sequelize,  // Passing the connection instance
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: false,
  },
);


module.exports = Usuario;
