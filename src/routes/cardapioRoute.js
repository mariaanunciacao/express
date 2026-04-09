import cardapioController from '../controllers/cardapioController.js';

export default (app) => {
    app.delete('/cardapio/delete/:id', cardapioController.destroy);
    app.patch('/cardapio/update/:id', cardapioController.update);
    app.post('/cardapio/create', cardapioController.create);
    app.get('/cardapio/get-all', cardapioController.get);
    app.get('/cardapio/get/:id', cardapioController.getById);
}
