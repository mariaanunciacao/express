import perfilController from "../controllers/perfilController.js";

export default (app) => {
    app.get('/perfil/get/:id', perfilController.getById);
    app.get('/perfil/get-all', perfilController.get);
}