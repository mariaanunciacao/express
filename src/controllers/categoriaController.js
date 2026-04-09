import Categoria from '../models/CategoriaModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Categoria.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Categorias encontradas',
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
            const dados = await Categoria.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Categorias encontradas',
                data: dados
            });
        }
        const dados = await Categoria.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Categoria encontrada',
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
            nome_categoria,
        } = req.body;

        if(nome_categoria === undefined || nome_categoria === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo nome_categoria não preenchido',
                data: null
            });
        }

        const retorno = await Categoria.create({
            nome_categoria,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Categoria criada',
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
    
        const dados = await Categoria.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Categoria excluída',
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
        const dados = await Categoria.findByPk(id);
        const camposPermitidos = ['nome_categoria'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada',
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
            message: 'Categoria atualizada',
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
