import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pedido from './PedidoModel.js';
import Cardapio from './CardapioModel.js';

const Carrinho = sequelize.define(
    'carrinhos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        valor_individual: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Carrinho.belongsTo(Pedido, {
    as: 'pedidos',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPedido',
        allowNull: false,
        field: 'id_pedido'
    }
});

Carrinho.belongsTo(Cardapio, {
    as: 'cardapios',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idCardapio',
        allowNull: false,
        field: 'id_cardapio'
    }
});

export default Carrinho;