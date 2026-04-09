import pedidoController from "../controllers/pedidoController.js";

export default (app) => {
    app.delete('/pedido/delete/:id', pedidoController.destroy);
    app.patch('/pedido/update/:id', pedidoController.update);
    app.post('/pedido/create', pedidoController.create);
    app.get('/pedido/get-all', pedidoController.get);
    app.get('/pedido/get/:id', pedidoController.getById);
}