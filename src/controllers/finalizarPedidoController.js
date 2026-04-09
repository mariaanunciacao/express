//controller que recebe o id do pedido e atualiza o status para id 3 e mostra o carrinho associado a esse pedido
//em outra rota é chamado o pedido e o id status é atualizado para 4 e mostra o carrinho associado a esse pedido
import Pedido from "../models/PedidoModel.js";
import Carrinho from "../models/CarrinhoModel.js";

const atualizarPedidoComCarrinhos = async (req, res, novoStatus) => {
    try {
        const { idPedido } = req.params;

        const idPedidoNumerico = Number(idPedido);

        if (Number.isNaN(idPedidoNumerico)) {
            return res.status(400).send({
                type: 'error',
                message: 'idPedido invalido',
                data: []
            });
        }

        const pedido = await Pedido.findByPk(idPedidoNumerico);

        if (!pedido) {
            return res.status(404).send({
                type: 'error',
                message: 'Pedido não encontrado',
                data: []
            });
        }

        pedido.idStatus = novoStatus;
        await pedido.save();

        const carrinhos = await Carrinho.findAll({
            where: {
                idPedido: idPedidoNumerico
            },
            include: [{
                association: 'cardapios'
            }]
        });

        return res.status(200).send({
            type: 'success',
            message: `Pedido atualizado para status ${novoStatus} com sucesso`,
            data: {
                pedido,
                carrinhos
            }
        });

    } catch (error) {

        res.status(500).send({
            type: 'error',
            message: 'Ocorreu um erro',
            data: error.message 
        });

    }
}

const updatePedidoToStatus3 = async (req, res) => {
    return atualizarPedidoComCarrinhos(req, res, 3);
}

const updatePedidoToStatus4 = async (req, res) => {
    return atualizarPedidoComCarrinhos(req, res, 4);
}

export default {
    updatePedidoToStatus3,
    updatePedidoToStatus4
};