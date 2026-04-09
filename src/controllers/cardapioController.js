import Cardapio from '../models/CardapioModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Cardapio.findAll();

        return res.status(200).send({
            type: 'success',
            message: 'Cardápio encontrado',
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
            const dados = await Cardapio.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Cardápios encontrados',
                data: dados
            });
        }
        const dados = await Cardapio.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Cardápio encontrado',
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
            preco,
            idCategoria,
            descricao,
            idRestaurante,
        } = req.body;

        if(preco === undefined || preco === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo preco não preenchido',
                data: null
            });
        }

        if(idCategoria === undefined || idCategoria === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idCategoria não preenchido',
                data: null
            });
        }

        if(descricao === undefined || descricao === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo descricao não preenchido',
                data: null
            });
        }

        if(idRestaurante === undefined || idRestaurante === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idRestaurante não preenchido',
                data: null
            });
        }

        const retorno = await Cardapio.create({
            preco,
            idCategoria,
            descricao,
            idRestaurante,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Cardápio criado',
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
    
        const dados = await Cardapio.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Cardápio excluído',
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
        const dados = await Cardapio.findByPk(id);
        const camposPermitidos = ['preco', 'idCategoria', 'descricao', 'idRestaurante'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cardápio não encontrado',
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
            message: 'Cardápio atualizado',
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