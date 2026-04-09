//cotroller que é chamado por uma rota get que retorna os pedidos com o status de id 1 para serem entregues 
import Pedido from "../models/PedidoModel.js";

const getPedidosDisponiveis = async (_req, res) => {
    try {
        const dados = await Pedido.findAll({
            where: {
                idStatus: 1
            }
        });

        return res.status(200).send({
            type: 'success',
            message: 'Pedidos disponíveis encontrados',
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
    getPedidosDisponiveis
};
