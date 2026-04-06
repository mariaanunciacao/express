import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

const Tarefa = sequelize.define(
    'tarefas', //definindo as colunas da tabela tarefas
    {
    id: {
        type: DataTypes.INTEGER, //Não possui o tipo serial, mas o INTEGER com autoIncrement é equivalente
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false //equivalente a NOT NULL no SQL
    },
    finalizado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false //equivalente a DEFAULT false no SQL
    }
},
{
    freezeTableName: true, //impede que o Sequelize pluralize o nome da tabela
    timestamps: true, //adiciona as colunas createdAt e updatedAt automaticamente
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
}
);

export default Tarefa;