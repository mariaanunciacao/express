import categoriaController from "../controllers/categoriaController.js";

export default (app) => {
    app.delete('/categoria/delete/:id', categoriaController.destroy);
    app.patch('/categoria/update/:id', categoriaController.update);
    app.post('/categoria/create', categoriaController.create);
    app.get('/categoria/get-all', categoriaController.get);
    app.get('/categoria/get/:id', categoriaController.getById);
}