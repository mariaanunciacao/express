import pedidoPendenteController from "../controllers/pedidoPendenteController.js";
import verifyPerfilForPedidoPendente from "../middlewares/verifyPerfilForPedidoPendente.js";

// export default (app) => {
//     app.get('/pedido-pendente/get', pedidoPendenteController.getPedidosPendentes);
// }

export default (app) => {
    app.get('/pedido-pendente', verifyPerfilForPedidoPendente, pedidoPendenteController.getPedidosPendentes);
}

