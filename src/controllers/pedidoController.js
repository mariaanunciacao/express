import Pedido from '../models/PedidoModel.js';

//GET ALL
const get = async (req, res) => {
    try {
        const dados = await Pedido.findAll();

        return res.status(200).send({
            type: 'sucess',
            message: 'Pedidos encontrados',
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
            const dados = await Pedido.findAll();

            return res.status(200).send({
                type: 'success',
                message: 'Pedidos encontrados',
                data: dados
            });
        }
        const dados = await Pedido.findByPk(id);
        
        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pedido não encontrado',
                data: null
            });
        }
        return res.status(200).send({
            type: 'success',
            message: 'Pedido encontrado',
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
            observacao,
            idPagamento,
            idCupom,
            idEndereco,
            idPessoa,
            idStatus,
            idEntregador,
        } = req.body;

        if(observacao === undefined || observacao === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo observacao não preenchido',
                data: null
            });
        }

        if(idPagamento === undefined || idPagamento === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idPagamento não preenchido',
                data: null
            });
        }

        if(idCupom === undefined || idCupom === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idCupom não preenchido',
                data: null
            });
        }

        if(idEndereco === undefined || idEndereco === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idEndereco não preenchido',
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

        if(idStatus === undefined || idStatus === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idStatus não preenchido',
                data: null
            });
        }

        if(idEntregador === undefined || idEntregador === null) {
            return res.status(400).send({
                type: 'error',
                message: 'Campo idEntregador não preenchido',
                data: null
            });
        }

        const retorno = await Pedido.create({
            observacao,
            idPagamento,
            idCupom,
            idEndereco,
            idPessoa,
            idStatus,
            idEntregador,
        });

        return res.status(201).send({
            type: 'success',
            message: 'Pedido criado',
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
    
        const dados = await Pedido.findByPk(id);

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pedido não encontrado',
                data: []
            });
        }

        await dados.destroy();

        return res.status(200).send({
            type: 'success',
            message: 'Pedido excluído',
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
        const dados = await Pedido.findByPk(id);
        const camposPermitidos = ['observacao', 'idPagamento', 'idCupom', 'idEndereco', 'idPessoa', 'idStatus', 'idEntregador'];

        if(!dados) {
            return res.status(404).send({
                type: 'error',
                message: 'Pedido não encontrado',
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
            message: 'Pedido atualizado',
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
