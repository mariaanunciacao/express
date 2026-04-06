//criando uma função que se autochama
import Tarefa from './TarefaModel.js';
(async () => {
    await Tarefa.sync({ force: true });
})();