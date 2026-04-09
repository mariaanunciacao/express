import restaurantesAbertosByFavoritosController from "../controllers/restaurantesAbertosByFavoritosController.js";

export default (app) => {
    app.get('/restaurantes-abertos-by-favoritos/get/:idPessoa', restaurantesAbertosByFavoritosController.getRestaurantesAbertosByFavoritos);
}