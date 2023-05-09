import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_chat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_chat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_sala: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_sala',
        key: 'id_sala'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_usuario',
        key: 'id_usuario'
      }
    },
    ds_mensagem: {
      type: DataTypes.STRING(10000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_chat" },
        ]
      },
      {
        name: "id_sala",
        using: "BTREE",
        fields: [
          { name: "id_sala" },
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}
