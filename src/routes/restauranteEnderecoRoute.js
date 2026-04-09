import restauranteEnderecoController from "../controllers/restauranteEnderecoController.js";

export default (app) => {
    app.delete('/restaurante-endereco/delete/:id', restauranteEnderecoController.destroy);
    app.patch('/restaurante-endereco/update/:id', restauranteEnderecoController.update);
    app.post('/restaurante-endereco/create', restauranteEnderecoController.create);
    app.get('/restaurante-endereco/get-all', restauranteEnderecoController.get);
    app.get('/restaurante-endereco/get/:id', restauranteEnderecoController.getById);
}