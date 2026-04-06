import tarefaController from "../controllers/tarefaController.js"; 

export default (app) => {
    app.get('/tarefa/get-all', tarefaController.get);
    app.post('/tarefa/create', tarefaController.create);
    app.get('/tarefa/get/:id', tarefaController.getById);
    app.delete('/tarefa/delete/:id', tarefaController.destroy);
    app.patch('/tarefa/update/:id', tarefaController.update);
}