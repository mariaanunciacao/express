//preciso de um controller que sera chamado por uma rota get que retorna os restaurantes abertos no horario atual
//iniciando pelos favoritos do usuário, e depois pelos restaurantes abertos no horario atual
import Restaurante from "../models/RestauranteModel.js";
import Favorito from "../models/FavoritoModel.js";
//pegar o id de pessoa (favoritos tem o idPessoa) e filtrar os restaurantes abertos pelos favoritos daquele id
const getRestaurantesAbertosByFavoritos = async (req, res) => {
    try {
        const idPessoa = Number(req.params.idPessoa ?? req.query.idPessoa);

        if (Number.isNaN(idPessoa)) {
            return res.status(400).send({
                type: 'error',
                message: 'idPessoa invalido',
                data: null
            });
        }

        //busca favoritos apenas da pessoa informada
        const favoritos = await Favorito.findAll({
            where: {
                idPessoa
            }
        });

        //pegar o time atual e filtrar os restaurantes abertos pelo horario_atendimento
        const agora = new Date();
        const horaAtual = agora.getHours();
        const restaurantes = await Restaurante.findAll();
        const restaurantesAbertos = restaurantes.filter((restaurante) => {
            const horario = String(restaurante.horario_atendimento ?? "");
            const horaAbertura = Number(horario.split(":")[0]);

            // Se o campo nao estiver em formato numerico, ignora no filtro de aberto.
            if (Number.isNaN(horaAbertura)) {
                return false;
            }

            return horaAbertura <= horaAtual;
        });

        const idsFavoritos = new Set(favoritos.map((favorito) => favorito.idRestaurante));

        //favoritos abertos primeiro
        const favoritosAbertos = restaurantesAbertos.filter((restaurante) => idsFavoritos.has(restaurante.id));

        //depois os demais restaurantes abertos
        const outrosAbertos = restaurantesAbertos.filter((restaurante) => !idsFavoritos.has(restaurante.id));

        const restaurantesAbertosByFavoritos = [...favoritosAbertos, ...outrosAbertos];

        return res.status(200).send({
            type: 'success',
            message: 'Restaurantes abertos encontrados',
            data: restaurantesAbertosByFavoritos
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
    getRestaurantesAbertosByFavoritos
};