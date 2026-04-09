import pedidoPendenteController from "../controllers/pedidoPendenteController.js";

export default (app) => {
    app.get('/pedido-pendente/get', pedidoPendenteController.getPedidosPendentes);
}