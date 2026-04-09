//um controller que sera chamado em uma rota que retorne os produtos de uma categoria específica
import Cardapio from "../models/CardapioModel.js";
import Categoria from "../models/CategoriaModel.js";

const getByCategoria = async (req, res) => {
    try {
        const { idCategoria } = req.params;
        const categoria = await Categoria.findByPk(idCategoria, {
            attributes: ['id', 'nome_categoria']
        });

        if (!categoria) {
            return res.status(404).send({
                type: 'error',
                message: 'Categoria não encontrada',
                data: null
            });
        }

        const dados = await Cardapio.findAll({
            where: {
                idCategoria: idCategoria
            }
        });

        return res.status(200).send({
            type: 'success',
            message: 'Cardápios encontrados',
            data: {
                categoria: categoria.nome_categoria,
                cardapios: dados
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

export default {
    getByCategoria
};