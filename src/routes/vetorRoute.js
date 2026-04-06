import vetorController from '../controllers/vetorController.js';

function vetorRoutes(app) {
    app.delete('/vetor/:tarefa', vetorController.deletar);
    app.put('/vetor', vetorController.put);
    app.post('/vetor/:tarefa/:finalizado', vetorController.post);
    app.get('/vetor', vetorController.get);
}

export default vetorRoutes