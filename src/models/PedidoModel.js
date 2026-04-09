import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pagamento from './PagamentoModel.js';
import Cupom from './CupomModel.js';
import Endereco from './EnderecoModel.js';
import Pessoa from './PessoaModel.js';
import Status from './StatusModel.js';
import Entregador from './EntregadorModel.js';

const Pedido = sequelize.define(
    'pedidos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        observacao: {
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

Pedido.belongsTo(Pagamento, {
    as: 'pagamentos',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPagamento',
        allowNull: false,
        field: 'id_pagamento'
    }
});

Pedido.belongsTo(Cupom, {
    as: 'cupons',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idCupom',
        allowNull: false,
        field: 'id_cupom'
    }
});

Pedido.belongsTo(Endereco, {
    as: 'enderecos',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idEndereco',
        allowNull: true,
        field: 'id_endereco'
    }
});

Pedido.belongsTo(Pessoa, {
    as: 'pessoas',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPessoa',
        allowNull: false,
        field: 'id_pessoa'
    }
});

Pedido.belongsTo(Status, {
    as: 'status',
    onDelete: 'NO ACTION', 
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idStatus',
        allowNull: false,
        field: 'id_status'
    }
});

Pedido.belongsTo(Entregador, {
    as: 'entregadores',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idEntregador',
        allowNull: true,
        field: 'id_entregador'
    }
});

export default Pedido;