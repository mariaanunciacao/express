import Tarefa from '../models/TarefaModel.js';

const get = async (req, res) => {
    try {
        const dados = await Tarefa.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Tarefas encontradas',
            data: dados
        });

    } catch (error) {

        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }
}
//get by id, retorna apenas a tarefa com o id especificado
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        //se o id for all retorna todos os elementos da tabela
        if(id === 'all') {
            const dados = await Tarefa.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Tarefas encontradas',
                data: dados
            });
        }
        const dados = await Tarefa.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Tarefa não encontrada',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Tarefa encontrada',
            data: dados
        });

    } catch (error) {

        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }
}

const create = async (req, res) => {
    try {
        const {
            descricao,
            finalizado,
        } = req.body;

        if(!descricao) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos descrição não preenchido',
                data: null
            });
        }

        const retorno = await Tarefa.create({
            descricao,
            finalizado
        });

        return res.status(201).send({
            type: 'success',
            message: 'Tarefa criada',
            data: retorno
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
    
        const dados = await Tarefa.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Tarefa excluída',
            data: []
        });
        
    } catch (error) {

        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });
    }

}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const requisicao = req.body;
        const dados = await Tarefa.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Não encontrado',
                data: []
            });
        }
        
        Object.keys(requisicao).forEach(campo => dados[campo] = requisicao[campo]);
        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Tarefa atualizada',
            data: dados
        });

    } catch (error) {

        console.log(error.message);
        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });
    }
}
export default {
    get,
    create,
    getById,
    destroy,
    update
}