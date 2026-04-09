//um controller que sera chamado em uma rota que retorne os produtos de uma categoria específica
import Cardapio from "../models/CardapioModel.js";
import Restaurante from "../models/RestauranteModel.js";

const getByRestaurante = async (req, res) => {
    try {
        const { idRestaurante } = req.params;
        const dados = await Cardapio.findAll({
            where: {
                idRestaurante: idRestaurante
            },
            include: [{
                model: Restaurante,
                as: 'restaurantes'
            }]
        });

        return res.status(200).send({
            type: 'success',
            message: 'Cardápios encontrados',
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
    getByRestaurante
};