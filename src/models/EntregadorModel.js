import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoa from './PessoaModel.js';

const Entregador = sequelize.define(
    'entregadores',
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

Entregador.belongsTo(Pessoa, {
    as: 'pessoas', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPessoa', 
        field: 'id_pessoa',
        allowNull: false
    }
});

export default Entregador;

