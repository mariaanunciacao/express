import Favorito from '../models/FavoritoModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Favorito.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Favoritos encontrados',
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
            const dados = await Favorito.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Favoritos encontrados',
                data: dados
            });
        }
        const dados = await Favorito.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Favorito não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Favorito encontrado',
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
            idPessoa,
            idRestaurante,
        } = req.body;

        if(idPessoa === undefined || idPessoa === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idPessoa não preenchido',
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

        const retorno = await Favorito.create({
            idPessoa,
            idRestaurante,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Favorito criado',
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
    
        const dados = await Favorito.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Favorito não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Favorito excluído',
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
        const dados = await Favorito.findByPk(id);
        const camposPermitidos = ['idPessoa', 'idRestaurante'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Favorito não encontrado',
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
            message: 'Favorito atualizado',
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
