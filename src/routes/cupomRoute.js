import cupomController from "../controllers/cupomController.js";

export default (app) => {
    app.delete('/cupom/delete/:id', cupomController.destroy);
    app.patch('/cupom/update/:id', cupomController.update);
    app.post('/cupom/create', cupomController.create);
    app.get('/cupom/get-all', cupomController.get);
    app.get('/cupom/get/:id', cupomController.getById);
}