import carrinhoController from '../controllers/carrinhoController.js';

export default (app) => {
    app.delete('/carrinho/delete/:id', carrinhoController.destroy);
    app.patch('/carrinho/update/:id', carrinhoController.update);
    app.post('/carrinho/create', carrinhoController.create);
    app.get('/carrinho/get-all', carrinhoController.get);
    app.get('/carrinho/get/:id', carrinhoController.getById);
}