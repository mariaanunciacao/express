import express from 'express'

const app = express();

app.use(express.json()); 

let vetor = [
    {
        tarefa: 'teste',
        data: new Date(Date.now()),
        finalizado: true
    },
    {
        tarefa: 'teste2',
        data: new Date(Date.now()),
        finalizado: false
    }
]

app.get('/vetor', (req, res) => {

    res.status(200).send({
        type: 'sucess',
        message: 'OKK',
        data: vetor
    })
})

//adciona mais uma posição no vetor
app.post('/vetor/:tarefa/:finalizado', (req, res) => {
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
})

//edita uma descrição do vetor
app.put('/vetor', (req, res) => {
    vetor[0].tarefa = 'teste1';
    res.status(200).send({
        type: 'sucess',
        message: 'Atualizado',
        data: vetor
    })
})

//deleta uma tarefa do vetor
app.delete('/vetor/:tarefa', (req, res) => {
    const tarefaParaDeletar = req.params.tarefa;

    vetor = vetor.filter(v => v.tarefa !== tarefaParaDeletar);
    console.log(`Tarefa ${tarefaParaDeletar} removida.`);

    res.status(200).send({
        type: 'sucess',
        message: 'Deletado',
        data: vetor
    })
})

app.listen(3333, () => {
    console.log('sistema rodando na porta 3333');
})