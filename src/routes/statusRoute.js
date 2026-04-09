import statusController from "../controllers/statusController.js";

export default (app) => {
    app.delete('/status/delete/:id', statusController.destroy);
    app.patch('/status/update/:id', statusController.update);
    app.post('/status/create', statusController.create);
    app.get('/status/get-all', statusController.get);
    app.get('/status/get/:id', statusController.getById);
}