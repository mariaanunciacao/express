import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

const Status = sequelize.define(
    'status',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        situacao: {
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

export default Status;
