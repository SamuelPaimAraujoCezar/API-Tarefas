const taskService = require("../services/taskService");

async function getAll(req, res) {
  const tasks = await taskService.getAllTasks();

  return res.json({
    sucesso: true,
    dados: tasks,
  });
}

async function getById(req, res) {
  const { id } = req.params;

  const task = await taskService.getTaskById(id);

  return res.json({
    sucesso: true,
    dados: task,
  });
}

async function create(req, res) {
  const task = await taskService.createTask(req.body);

  return res.json({
    sucesso: true,
    dados: task,
  });
}

async function update(req, res) {
  const { id } = req.params;

  const task = await taskService.updateTask(id, req.body);

  return res.json({
    sucesso: true,
    dados: task,
  });
}

async function remove(req, res) {
  const { id } = req.params;

  await taskService.deleteTask(id);

  return res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
