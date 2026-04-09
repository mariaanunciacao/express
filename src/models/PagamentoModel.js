import { sequelize } from '../config/index.js';  
import { DataTypes } from 'sequelize';
import Status from './StatusModel.js';
import TipoPagamento from './TipoPagamentoModels.js';

const Pagamento = sequelize.define(
    'pagamentos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Pagamento.belongsTo(Status, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idStatus',
        field: 'id_status',
        allowNull: false
    }
});

Pagamento.belongsTo(TipoPagamento, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idTipoPagamento',
        field: 'id_tipo_pagamento',
        allowNull: false
    }
});

export default Pagamento;