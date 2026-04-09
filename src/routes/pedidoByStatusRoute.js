import pedidoByStatusController from "../controllers/pedidoByStatusController.js";

export default (app) => {
    app.patch('/pedido-by-status/:idPedido', pedidoByStatusController.patchPedidosByStatus);
}