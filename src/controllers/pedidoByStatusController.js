//a rota vai pegar o id do pedido e passar esse pedido para o status 2(saiu para entrega)
import Pedido from "../models/PedidoModel.js";
import Status from "../models/StatusModel.js";

const patchPedidosByStatus = async (req, res) => {
    try {
        const idPedido = Number(req.params.idPedido);

        if (Number.isNaN(idPedido)) {
            return res.status(400).send({
                type: 'error',
                message: 'idPedido invalido',
                data: null
            });
        }

        const [quantidadeAtualizada] = await Pedido.update(
            { idStatus: 2 },
            {
                where: {
                    id: idPedido
                }
            }
        );

        if (quantidadeAtualizada === 0) {
            return res.status(404).send({
                type: 'error',
                message: 'Pedido nao encontrado',
                data: null
            });
        }

        const dados = await Pedido.findByPk(idPedido, {
            include: [
                {
                    model: Status,
                    as: 'status'
                }
            ]
        });

        return res.status(200).send({
            type: 'success',
            message: 'Status do pedido atualizado para 2',
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

export default {
    patchPedidosByStatus
};