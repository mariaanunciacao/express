import entregadorController from "../controllers/entregadorController.js";

export default (app) => {
    app.delete('/entregador/delete/:id', entregadorController.destroy);
    app.patch('/entregador/update/:id', entregadorController.update);
    app.post('/entregador/create', entregadorController.create);
    app.get('/entregador/get-all', entregadorController.get);
    app.get('/entregador/get/:id', entregadorController.getById);
}