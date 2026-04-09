//preciso de uma rota que chame os cardapios agrupados por restaurante
import cardapioByRestauranteController from "../controllers/cardapioByRestauranteController.js";

export default (app) => {
    app.get('/cardapio-restaurante/get/:idRestaurante', cardapioByRestauranteController.getByRestaurante);
}