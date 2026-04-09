import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Pessoa from './PessoaModel.js';

const Endereco = sequelize.define(
    'enderecos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        logradouro: {
            type: DataTypes.STRING(240),
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(30),
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

Endereco.belongsTo(Pessoa, { 
    as: 'pessoas', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPessoa',   
        field: 'id_pessoa',
        allowNull: false
    }
});

export default Endereco;