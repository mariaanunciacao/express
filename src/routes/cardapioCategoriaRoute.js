//preciso de uma rota que chame os produtos agrupados por categoria, ou seja, uma rota que retorne os produtos de uma categoria específica
import cardapioCategoriaController from "../controllers/cardapioCategoriaController.js";

export default (app) => {
    app.get('/cardapio-categoria/get/:idCategoria', cardapioCategoriaController.getByCategoria);
}