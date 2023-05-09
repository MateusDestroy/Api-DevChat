import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_usuario extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nm_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nm_senha: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nm_nick: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}
