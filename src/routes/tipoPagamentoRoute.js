import tipoPagamentoController from "../controllers/tipoPagamentoController.js";

export default (app) => {
    app.delete('/tipopagamento/delete/:id', tipoPagamentoController.destroy);
    app.patch('/tipopagamento/update/:id', tipoPagamentoController.update);
    app.post('/tipopagamento/create', tipoPagamentoController.create);
    app.get('/tipopagamento/get-all', tipoPagamentoController.get);
    app.get('/tipopagamento/get/:id', tipoPagamentoController.getById);
}