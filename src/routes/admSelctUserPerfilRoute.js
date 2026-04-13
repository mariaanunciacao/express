import admSelectUserPerfilController from "../controllers/admSelectUserPerfilController.js";

export default (app) => {
    app.get('/adm-select-user-perfil/get/:id', admSelectUserPerfilController.getById);
    app.get('/adm-select-user-perfil/get-all', admSelectUserPerfilController.get);
    app.patch('/adm-select-user-perfil/update', admSelectUserPerfilController.update);
}