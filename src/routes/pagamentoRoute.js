import pagamentoController from "../controllers/pagamentoController.js";

export default (app) => {
    app.delete('/pagamento/delete/:id', pagamentoController.destroy);
    app.patch('/pagamento/update/:id', pagamentoController.update);
    app.post('/pagamento/create', pagamentoController.create);
    app.get('/pagamento/get-all', pagamentoController.get);
    app.get('/pagamento/get/:id', pagamentoController.getById);
}