const tarefasService = require("../services/tarefasService");
const { successResponse } = require("../utils/response");

async function listarTarefas(req, res, next) {
  try {
    const tarefas = await tarefasService.listarTarefas();

    return successResponse(res, tarefas);
  } catch (err) {
    next(err);
  }
}

async function buscarTarefa(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const tarefa = await tarefasService.buscarTarefa(id);

    return successResponse(res, tarefa);
  } catch (err) {
    next(err);
  }
}

async function criarTarefa(req, res, next) {
  try {
    const nome = req.body.nome;

    const tarefa = await tarefasService.criarTarefa(nome);

    return successResponse(res, tarefa, 201);
  } catch (err) {
    next(err);
  }
}

async function atualizarTarefa(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;

    const tarefa = await tarefasService.atualizarTarefa(id, nome);

    return successResponse(res, tarefa);
  } catch (err) {
    next(err);
  }
}

async function deletarTarefa(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    await tarefasService.deletarTarefa(id);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarTarefas,
  buscarTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
};
