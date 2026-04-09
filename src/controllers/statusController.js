import Status from '../models/StatusModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Status.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Status encontrados',
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
            const dados = await Status.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Status encontrados',
                data: dados
            });
        }
        const dados = await Status.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Status não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Status encontrado',
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
            situacao,
        } = req.body;

        if(situacao === undefined || situacao === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo situacao não preenchido',
                data: null
            });
        }

        const retorno = await Status.create({
            situacao
        });

        return res.status(201).send({
            type: 'success',
            message: 'Status criado',
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
    
        const dados = await Status.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Status não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Status excluído',
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
        const dados = await Status.findByPk(id);
        const camposPermitidos = ['situacao'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Status não encontrado',
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
            message: 'Status atualizado',
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
