const taskService = require("../services/taskService");

async function getAll(req, res) {
  const result = await taskService.getAllTasks(req.query, req.userId);

  return res.json({
    sucesso: true,
    dados: result.tasks,
    meta: {
      total: result.total,
      pagina: result.page,
      totalPaginas: result.totalPages,
    },
  });
}

async function getById(req, res) {
  const { id } = req.params;

  const task = await taskService.getTaskById(id, req.userId);

  return res.json({
    sucesso: true,
    dados: task,
  });
}

async function create(req, res) {
  const data = {
    ...req.body,
    userId: req.userId,
  };

  const task = await taskService.createTask(data);

  return res.status(201).json({
    sucesso: true,
    dados: task,
  });
}

async function update(req, res) {
  const { id } = req.params;

  const task = await taskService.updateTask(id, req.body, req.userId);

  return res.json({
    sucesso: true,
    dados: task,
  });
}

async function remove(req, res) {
  const { id } = req.params;

  await taskService.deleteTask(id, req.userId);

  return res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
