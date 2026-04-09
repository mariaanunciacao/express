import finalizarPedidoController from "../controllers/finalizarPedidoController.js";

export default (app) => {
    app.patch('/finalizar-pedido/status3/:idPedido', finalizarPedidoController.updatePedidoToStatus3);
    app.patch('/finalizar-pedido/status4/:idPedido', finalizarPedidoController.updatePedidoToStatus4);
}