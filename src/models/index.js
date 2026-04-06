//criando uma função que se autochama
import Tarefa from './TarefaModel.js';
import TarefaUsuario from './tarefaUsuario.js';
(async () => {
    await Tarefa.sync({ force: true });
    await TarefaUsuario.sync();
})();
