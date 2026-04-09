import Pessoa from '../models/PessoaModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Pessoa.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Pessoas encontradas',
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
            const dados = await Pessoa.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Pessoas encontradas',
                data: dados
            });
        }
        const dados = await Pessoa.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Pessoa encontrada',
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
            nome,
            email,
            senha,
            cpf,
            data_nascimento,
        } = req.body;

        if(nome === undefined || nome === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo nome não preenchido',
                data: null
            });
        }

        if(email === undefined || email === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo email não preenchido',
                data: null
            });
        }

        if(senha === undefined || senha === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo senha não preenchido',
                data: null
            });
        }

        if(cpf === undefined || cpf === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo cpf não preenchido',
                data: null
            });
        }

        if(data_nascimento === undefined || data_nascimento === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo data_nascimento não preenchido',
                data: null
            });
        }

        const retorno = await Pessoa.create({
            nome,
            email,
            senha,
            cpf,
            data_nascimento,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Pessoa criada',
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
    
        const dados = await Pessoa.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Pessoa excluída',
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
        const dados = await Pessoa.findByPk(id);
        const camposPermitidos = ['nome', 'email', 'senha', 'cpf', 'data_nascimento'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pessoa não encontrada',
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
            message: 'Pessoa atualizada',
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
