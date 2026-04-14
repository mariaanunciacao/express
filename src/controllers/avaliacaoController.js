import Avaliacao from '../models/AvaliacaoModel.js';
import Pedido from '../models/PedidoModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const idPessoaMiddleware = req.idPessoa;
        const idPessoaQuery = req.query?.idPessoa;
        const idPessoa = idPessoaMiddleware ?? idPessoaQuery;

        const includePedido = {
            model: Pedido,
            as: 'avaliacpes',
            attributes: ['id', 'idPessoa']
        };

        if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '') {
            includePedido.where = {
                idPessoa: Number(idPessoa)
            };
            includePedido.required = true;
        }

        const dados = await Avaliacao.findAll({
            attributes: ['id', 'nota', 'comentario'],
            include: [includePedido]
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'Avaliacoes encontradas',
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

//GET BY ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        //se o id for all retorna todos os elementos da tabela
        if(id === 'all') {
            const dados = await Avaliacao.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Avaliações encontradas',
                data: dados
            });
        }
        const dados = await Avaliacao.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Avaliação não encontrada',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Avaliação encontrada',
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

//POST
const create = async (req, res) => {
    try {
        const {
            comentario,
            nota,
            idPedido,
        } = req.body;

        if(nota === undefined || nota === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo nota não preenchido',
                data: null
            });
        }

        if(idPedido === undefined || idPedido === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idPedido não preenchido',
                data: null
            });
        }

        const retorno = await Avaliacao.create({
            comentario,
            nota,
            idPedido
        });

        return res.status(201).send({
            type: 'success',
            message: 'Avaliação criada',
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

//DELETE
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
    
        const dados = await Avaliacao.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Avaliação não encontrada',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Avaliação excluída',
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

//PATCH BY ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const requisicao = req.body;
        const dados = await Avaliacao.findByPk(id);
        const camposPermitidos = ['nota', 'comentario', 'idPedido'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Avaliação não encontrada',
                data: []
            });
        }

        const camposInvalidos = Object.keys(requisicao).filter(campo => !camposPermitidos.includes(campo));

        if(camposInvalidos.length > 0) {
            return res.status(400).send({
                type: 'error',
                message: 'Campos inválidos para atualização',
                data: camposInvalidos
            });
        }
        
        Object.keys(requisicao).forEach(campo => dados[campo] = requisicao[campo]);
        await dados.save();

        return res.status(200).send({
            type: 'success',
            message: 'Avaliação atualizada',
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