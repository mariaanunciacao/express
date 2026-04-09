import avaliacaoController from '../controllers/avaliacaoController.js'; 

export default (app) => {
    app.get('/avaliacao/get-all', avaliacaoController.get);
    app.post('/avaliacao/create', avaliacaoController.create);
    app.get('/avaliacao/get/:id', avaliacaoController.getById);
    app.delete('/avaliacao/delete/:id', avaliacaoController.destroy);
    app.patch('/avaliacao/update/:id', avaliacaoController.update);
}