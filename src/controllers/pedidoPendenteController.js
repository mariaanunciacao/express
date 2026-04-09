//pegar os pedidos com status 1 atraves de uma rota get
import Pedido from "../models/PedidoModel.js";

const getPedidosPendentes = async (_req, res) => {
    try {
        await Pedido.update(
            { idEntregador: null },
            {
                where: {
                    idStatus: 1
                }
            }
        );

        const dados = await Pedido.findAll({
            where: {
                idStatus: 1,
                idEntregador: null
            }
        });

        return res.status(200).send({
            type: 'success',
            message: 'Pedidos pendentes encontrados',
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
    getPedidosPendentes
};