import Carrinho from '../models/CarrinhoModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Carrinho.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Carrinhos encontrados',
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
            const dados = await Carrinho.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Carrinho encontrado',
                data: dados
            });
        }
        const dados = await Carrinho.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Carrinho encontrado',
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
            valor_individual,
            idPedido,
            idCardapio,
        } = req.body;

        if(valor_individual === undefined || valor_individual === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo valor_individual não preenchido',
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

        if(idCardapio === undefined || idCardapio === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idCardapio não preenchido',
                data: null
            });
        }

        const retorno = await Carrinho.create({
            valor_individual,
            idPedido,
            idCardapio
        });

        return res.status(201).send({
            type: 'success',
            message: 'Carrinho criado',
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
    
        const dados = await Carrinho.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Carrinho excluído',
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
        const dados = await Carrinho.findByPk(id);
        const camposPermitidos = ['valor_individual', 'idPedido', 'idCardapio'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Carrinho não encontrado',
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
            message: 'Carrinho atualizado',
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