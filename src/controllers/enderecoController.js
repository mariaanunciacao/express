import Endereco from "../models/EnderecoModel.js";

//GET ALL
const get = async (req, res) => {
    try {
        const idPessoaMiddleware = req.idPessoa;
        const idPessoaQuery = req.query?.idPessoa;
        const idPessoa = idPessoaMiddleware ?? idPessoaQuery;

        const where = {};

        if (idPessoa !== undefined && idPessoa !== null && idPessoa !== '') {
            where.idPessoa = Number(idPessoa);
        }

        const dados = await Endereco.findAll({
            where,
            attributes: ['id', 'logradouro', 'cep', 'numero', 'created_at', 'updated_at'],
            // include: [
            //     {
            //         association: 'restaurantes',
            //         attributes: ['id', 'nome_restaurante']
            //     }
            // ]
        });

        return res.status(200).send({
            type: 'sucess',
            message: 'Enderecos encontrados',
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
            const dados = await Endereco.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Endereços encontrados',
                data: dados
            });
        }
        const dados = await Endereco.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereco não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Endereco encontrado',
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
            idPessoa
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

        if(idPessoa === undefined || idPessoa === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idPessoa não preenchido',
                data: null
            });
        }

        const retorno = await Endereco.create({
            logradouro,
            cep,
            numero,
            cidade,
            estado,
            idPessoa
        });

        return res.status(201).send({
            type: 'success',
            message: 'Endereco criado',
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
    
        const dados = await Endereco.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereco não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Endereco excluído',
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
        const dados = await Endereco.findByPk(id);
        const camposPermitidos = ['logradouro', 'cep', 'numero', 'cidade', 'estado', 'idPessoa'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Endereco não encontrado',
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
            message: 'Endereco atualizado',
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
