const taskRepository = require("../repositories/taskRepository");
const AppError = require("../errors/AppError");

class TaskService {
  async createTask(data) {
    return await taskRepository.create(data);
  }

  async getAllTasks(query, userId) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const filters = { userId };

    if (query.completed !== undefined) {
      filters.completed = query.completed;
    }

    if (query.title) {
      filters.title = { $regex: query.title, $options: "i" };
    }

    const sortField = query.sort || "dueDate";
    const sortOrder = query.order === "desc" ? -1 : 1;

    const sort = { [sortField]: sortOrder };

    return await taskRepository.findAll({
      page,
      limit,
      filters,
      sort,
    });
  }

  async getTaskById(id, userId) {
    const task = await taskRepository.findById(id, userId);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    return task;
  }

  async updateTask(id, data, userId) {
    const task = await taskRepository.update(id, data, userId);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    return task;
  }

  async deleteTask(id, userId) {
    const task = await taskRepository.delete(id, userId);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }
  }
}

module.exports = new TaskService();
