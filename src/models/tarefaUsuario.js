import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import Tarefa from "./TarefaModel.js";

const TarefaUsuario = sequelize.define(
    'tarefas_usuarios', //definindo as colunas da tabela tarefa_usuario
    {
    id: {
        type: DataTypes.INTEGER, //Não possui o tipo serial, mas o INTEGER com autoIncrement é equivalente
        primaryKey: true,
        autoIncrement: true
        },
    },
    {
        freezeTableName: true, //impede que o Sequelize pluralize o nome da tabela
        timestamps: true, //adiciona as colunas createdAt e updatedAt automaticamente
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

TarefaUsuario.belongsTo(Tarefa, {
    as: 'tarefas', //nome do campo de associação
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idTarefa', //nome da coluna de chave estrangeira
        allowNull: false,
        field: 'id_tarefa' //nome da coluna no banco de dados
    }
}); //tarefa_id é a chave estrangeira que referencia a tabela tarefas

export default TarefaUsuario;