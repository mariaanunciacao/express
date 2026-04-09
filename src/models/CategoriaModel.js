import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';

const Categoria = sequelize.define (
    'categorias',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_categoria: {
            type: DataTypes.STRING(200),
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

export default Categoria;