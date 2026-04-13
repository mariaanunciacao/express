import usuarioPerfilController from "../controllers/usuarioPerfilController.js";

export default (app) => {
    app.get('/perfil/get/:id', usuarioPerfilController.getById);
}