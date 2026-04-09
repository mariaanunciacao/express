import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Cupom from './CupomModel.js';

const Restaurante = sequelize.define(
    'restaurantes',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cnpj: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        nome_restaurante: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        horario_atendimento: {
            type: DataTypes.STRING(240),
            allowNull: false
        },
        tempo_entrega: {
            type: DataTypes.TIME,
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

Restaurante.belongsTo(Cupom, {
    as: 'cupons', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idCupom', 
        allowNull: false,
        field: 'id_cupom'        
    }
});

export default Restaurante;