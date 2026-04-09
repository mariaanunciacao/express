import { sequelize } from '../config/index.js';
import { DataTypes } from 'sequelize';
import Categoria from './CategoriaModel.js';
import Restaurante from './RestauranteModel.js';

const Cardapio = sequelize.define(
    'cardapios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descricao: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        preco: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Cardapio.belongsTo(Categoria, {
    as: 'categorias',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idCategoria',
        allowNull: false,
        field: 'id_categoria'
    }
});

Cardapio.belongsTo(Restaurante, {
    as: 'restaurantes',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idRestaurante',
        allowNull: false,
        field: 'id_restaurante'
    }
});

export default Cardapio;