import enderecoController from "../controllers/enderecoController.js";
import verifyTokenAndGetEndereco from "../middlewares/verifyTokenAndGetEndereco.js";

export default (app) => {
    app.delete('/endereco/delete/:id', enderecoController.destroy);
    app.patch('/endereco/update/:id', enderecoController.update);
    app.post('/endereco/create', enderecoController.create);
    app.get('/endereco/get-all', enderecoController.get);
    app.get('/endereco/get/:id', enderecoController.getById);
    app.get('/endereco-by-token/get', verifyTokenAndGetEndereco, enderecoController.get);
}