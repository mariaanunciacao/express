const get =  (req, res) => {

    res.status(200).send({
        type: 'sucess',
        message: 'OKK',
        data: vetor
    })
}

const post = (req, res) => {
    console.log(req.body);

    const novaTarefa = {
        tarefa: req.params.tarefa,
        data: new Date(Date.now()),
        finalizado: req.params.finalizado === 'true'
    }

    vetor.push(novaTarefa);
    return res.status(200).send({
        type: 'sucess',
        message: 'OKK',
        data: vetor
    })
}

const put = (req, res) => {
    vetor[0].tarefa = 'teste1';
    res.status(200).send({
        type: 'sucess',
        message: 'Atualizado',
        data: vetor
    })
}

const deletar = (req, res) => {
    const tarefaParaDeletar = req.params.tarefa;

    // Fique apenas com as tarefas cujo nome (v.tarefa) seja diferente 
    // da tarefa que eu quero deletar (tarefaParaDeletar)". O item que
    // for igual à tarefaParaDeletar é descartado.
    vetor = vetor.filter(v => v.tarefa !== tarefaParaDeletar);
    console.log(`Tarefa ${tarefaParaDeletar} removida.`);
    // O método .filter() percorre todo o array original (vetor). Ele 
    // cria um novo array contendo apenas os itens que passam em uma 
    // condição (onde a função de teste retorna true).

    res.status(200).send({
        type: 'sucess',
        message: 'Deletado',
        data: vetor
    })
}

export default {
    get,
    post,
    put,
    deletar
}