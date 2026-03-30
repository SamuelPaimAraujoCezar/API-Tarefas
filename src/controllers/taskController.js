const taskService = require("../services/taskService");

class TaskController {
  async create(req, res) {
    const task = await taskService.createTask(req.body, req.user);

    return res.status(201).json({
      sucesso: true,
      dados: task,
    });
  }

  async getAll(req, res) {
    const { dados, meta } = await taskService.getAllTasks(req.query, req.user);

    return res.json({
      sucesso: true,
      dados,
      meta,
    });
  }

  async getById(req, res) {
    const { id } = req.params;

    const task = await taskService.getTaskById(id, req.user);

    return res.json({
      sucesso: true,
      dados: task,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const task = await taskService.updateTask(id, req.body, req.user);

    return res.json({
      sucesso: true,
      dados: task,
    });
  }

  async remove(req, res) {
    const { id } = req.params;

    await taskService.deleteTask(id, req.user);

    return res.status(204).send();
  }
}

module.exports = new TaskController();
