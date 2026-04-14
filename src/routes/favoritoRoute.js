import favoritoController from "../controllers/favoritoController.js";
import verifyTokenAndGetFavoritos from "../middlewares/verityTokenAndGetFavoritos.js";

export default (app) => {
    app.delete('/favorito/delete/:id', favoritoController.destroy);
    app.patch('/favorito/update/:id', favoritoController.update);
    app.post('/favorito/create', favoritoController.create);
    app.get('/favorito/get-all', favoritoController.get);
    app.get('/favorito/get/:id', favoritoController.getById);
    app.get('/favorito-by-token/get', verifyTokenAndGetFavoritos, favoritoController.get);
}