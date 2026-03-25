const http = require('http');

let tarefas = [
  { id: 1, nome: 'Estudar Node' },
  { id: 2, nome: 'Praticar código' }
];

function listarTarefas(res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(tarefas));
}

function buscarTarefa(id, res) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    res.end('Tarefa não encontrada');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(tarefa));
}

function criarTarefa(nome, res) {
  if (!nome) {
    res.end('Nome da tarefa não informado');
    return;
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    nome: nome
  };

  tarefas.push(novaTarefa);

  res.end('Tarefa criada com sucesso');
}

function atualizarTarefa(id, nome, res) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    res.end('Tarefa não encontrada');
    return;
  }

  if (!nome) {
    res.end('Novo nome não informado');
    return;
  }

  tarefa.nome = nome;

  res.end('Tarefa atualizada com sucesso');
}

function deletarTarefa(id, res) {
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    res.end('Tarefa não encontrada');
    return;
  }

  tarefas.splice(index, 1);

  res.end('Tarefa deletada com sucesso');
}

const server = http.createServer((req, res) => {
  if (req.url === '/tarefas') {
    listarTarefas(res);

  } else if (req.url.startsWith('/tarefas/')) {
    const id = parseInt(req.url.split('/')[2]);
    buscarTarefa(id, res);
  
  } else if (req.url.startsWith('/criar-tarefa?nome')) {
    const nome = decodeURIComponent(req.url.split('=')[1]);
    criarTarefa(nome, res);

  } else if (req.url.startsWith('/atualizar-tarefa/')) {
    const partes = req.url.split('/');
    const id = parseInt(partes[2]);
    const nome = decodeURIComponent(partes[3]);

    atualizarTarefa(id, nome, res);
    
  } else if (req.url.startsWith('/deletar-tarefa/')) {
    const id = parseInt(req.url.split('/')[2]);
    deletarTarefa(id, res);

  } else {
    res.statusCode = 404;
    res.end('Rota não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});