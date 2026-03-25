const fs = require("fs").promises;

let tarefas = [];

async function carregarTarefas() {
  const dados = await fs.readFile("tarefas.json", "utf-8");
  tarefas = JSON.parse(dados);
}

async function salvarTarefas() {
  await fs.writeFile("tarefas.json", JSON.stringify(tarefas, null, 2));
}

function validarNome(nome) {
  if (!nome) {
    return "Nome é obrigatório";
  }

  if (nome.length < 3) {
    return "Nome deve ter pelo menos 3 caracteres";
  }

  if (nome.length > 50) {
    return "Nome deve ter no máximo 50 caracteres";
  }

  return null;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(id) {
  return tarefas.find((t) => t.id === id);
}

async function criarTarefa(nome) {
  const erro = validarNome(nome);

  if (erro) {
    return { erro };
  }

  const maiorId =
    tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) : 0;

  const novaTarefa = {
    id: maiorId + 1,
    nome,
  };

  tarefas.push(novaTarefa);
  await salvarTarefas();

  return { tarefa: novaTarefa };
}

async function atualizarTarefa(id, nome) {
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) return { tarefa: null };

  const erro = validarNome(nome);

  if (erro) {
    return { erro };
  }

  tarefa.nome = nome;
  await salvarTarefas();
  return { tarefa: tarefa };
}

async function deletarTarefa(id) {
  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tarefas.splice(index, 1);
  await salvarTarefas();
  return true;
}

module.exports = {
  carregarTarefas,
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
