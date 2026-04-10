import avaliacaoRoute from './avaliacaoRoute.js';
import cardapioRoute from './cardapioRoute.js';
import carrinhoRoute from './carrinhoRoute.js';
import categoriaRoute from './categoriaRoute.js';
import cupomRoute from './cupomRoute.js';
import enderecoRoute from './enderecoRoute.js';
import entregadorRoute from './entregadorRoute.js';
import favoritoRoute from './favoritoRoute.js';
import pagamentoRoute from './pagamentoRoute.js';
import pedidoRoute from './pedidoRoute.js';
import pessoaRoute from './pessoaRoute.js';
import produtoCategoriaRoute from './cardapioCategoriaRoute.js';
import restauranteRoute from './restauranteRoute.js';
import statusRoute from './statusRoute.js';
import tipoPagamentoRoute from './tipoPagamentoRoute.js';
import cardapioCategoriaRoute from './cardapioCategoriaRoute.js';
import restaurantesAbertosByFavoritosRoute from './restaurantesAbertosByFavoritosRoute.js';
import restauranteEnderecoRoute from './restauranteEnderecoRoute.js';
import cardapioByRestauranteRoute from './cardapioByRestauranteRoute.js';
import pedidoByStatusRoute from './pedidoByStatusRoute.js';
import finalizarPedidoRoute from './finalizarPedidoRoute.js';
import pedidoPendenteRoute from './pedidoPendenteRoute.js';
import usuarioRoute from './usuarioRoute.js';

function Routes(app) {
    avaliacaoRoute(app)
    restauranteEnderecoRoute(app)
    cardapioRoute(app)
    carrinhoRoute(app)
    categoriaRoute(app)
    cupomRoute(app)
    enderecoRoute(app)
    entregadorRoute(app)
    favoritoRoute(app)
    pagamentoRoute(app)
    pedidoRoute(app)
    pessoaRoute(app)
    produtoCategoriaRoute(app)
    restauranteRoute(app)
    statusRoute(app)
    tipoPagamentoRoute(app)
    cardapioCategoriaRoute(app)
    restaurantesAbertosByFavoritosRoute(app)
    cardapioByRestauranteRoute(app)
    pedidoByStatusRoute(app)
    finalizarPedidoRoute(app)
    pedidoPendenteRoute(app)
    usuarioRoute(app)
}

export default Routes