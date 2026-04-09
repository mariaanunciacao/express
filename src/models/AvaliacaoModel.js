import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pedido from './PedidoModel.js';

const Avaliacao = sequelize.define(
    'avaliacoes',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comentario: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Avaliacao.belongsTo(Pedido, {
    as: 'avaliacpes',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPedido',
        allowNull: false,
        field: 'id_pedido'
    }
});

export default Avaliacao;