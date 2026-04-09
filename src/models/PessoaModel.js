import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

const Pessoa = sequelize.define(
    'pessoas',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.DATE,
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

export default Pessoa;