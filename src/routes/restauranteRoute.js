import restauranteController from "../controllers/restauranteController.js";

export default (app) => {
    app.delete('/restaurante/delete/:id', restauranteController.destroy);
    app.patch('/restaurante/update/:id', restauranteController.update);
    app.post('/restaurante/create', restauranteController.create);
    app.get('/restaurante/get-all', restauranteController.get);
    app.get('/restaurante/get/:id', restauranteController.getById);
    app.post('/restaurante-api/nearby', restauranteController.searchNearby);
}