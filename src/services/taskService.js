const taskRepository = require("../repositories/taskRepository");
const AppError = require("../errors/AppError");

class TaskService {
  async createTask(data) {
    return await taskRepository.create(data);
  }

  async getAllTasks() {
    return await taskRepository.findAll();
  }

  async getTaskById(id) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    return task;
  }

  async updateTask(id, data) {
    const task = await taskRepository.update(id, data);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    return task;
  }

  async deleteTask(id) {
    const task = await taskRepository.delete(id);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }
  }
}

module.exports = new TaskService();
