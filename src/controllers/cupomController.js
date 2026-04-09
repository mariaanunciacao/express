import Cupom from "../models/CupomModel.js";

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Cupom.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Cupons encontrados',
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
            const dados = await Cupom.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Cupons encontrados',
                data: dados
            });
        }
        const dados = await Cupom.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Cupom encontrado',
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
            condicao,
            valor,
            ativo,
        } = req.body;

        if(condicao === undefined || condicao === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo condicao não preenchido',
                data: null
            });
        }

        if(valor === undefined || valor === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo valor não preenchido',
                data: null
            });
        }

        if(ativo === undefined || ativo === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo ativo não preenchido',
                data: null
            });
        }

        const retorno = await Cupom.create({
            condicao,
            valor,
            ativo,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Cupom criado',
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
    
        const dados = await Cupom.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Cupom excluído',
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
        const dados = await Cupom.findByPk(id);
        const camposPermitidos = ['condicao', 'valor', 'ativo'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Cupom não encontrado',
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
            message: 'Cupom atualizado',
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
