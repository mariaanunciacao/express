import RestauranteEndereco from '../models/RestauranteEnderecoModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await RestauranteEndereco.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Endereços de restaurantes encontrados',
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
            const dados = await RestauranteEndereco.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Endereços de restaurantes encontrados',
                data: dados
            });
        }
        const dados = await RestauranteEndereco.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço de restaurante não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Endereço de restaurante encontrado',
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
            logradouro,
            cep,
            numero,
            cidade,
            estado,
            idRestaurante,
        } = req.body;

        if(logradouro === undefined || logradouro === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo logradouro não preenchido',
                data: null
            });
        }

        if(cep === undefined || cep === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo cep não preenchido',
                data: null
            });
        }

        if(numero === undefined || numero === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo numero não preenchido',
                data: null
            });
        }

        if(cidade === undefined || cidade === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo cidade não preenchido',
                data: null
            });
        }

        if(estado === undefined || estado === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo estado não preenchido',
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

        const retorno = await RestauranteEndereco.create({
            logradouro,
            cep,
            numero,
            cidade,
            estado,
            idRestaurante,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Endereço de restaurante criado',
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
    
        const dados = await RestauranteEndereco.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço de restaurante não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Endereço de restaurante excluído',
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
        const dados = await RestauranteEndereco.findByPk(id);
        const camposPermitidos = ['logradouro', 'cep', 'numero', 'cidade', 'estado', 'idRestaurante'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereço de restaurante não encontrado',
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
            message: 'Endereço de restaurante atualizado',
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
