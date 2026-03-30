const taskRepository = require("../repositories/taskRepository");
const TaskPermission = require("../permissions/TaskPermission");
const AppError = require("../errors/AppError");

class TaskService {
  async createTask(data, user) {
    return await taskRepository.create({
      ...data,
      userId: user.id,
    });
  }

  async getAllTasks(query, user) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const isAdmin = user.role === "ADMIN";

    const filters = isAdmin ? {} : { userId: user.id };

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

  async getTaskById(id, user) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    if (!TaskPermission.canAccess(task, user)) {
      throw new AppError("Acesso negado", 403);
    }

    return task;
  }

  async updateTask(id, data, user) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    if (!TaskPermission.canAccess(task, user)) {
      throw new AppError("Acesso negado", 403);
    }

    return await taskRepository.update(id, data);
  }

  async deleteTask(id, user) {
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(`Tarefa com id ${id} não encontrada`, 404);
    }

    if (!TaskPermission.canAccess(task, user)) {
      throw new AppError("Acesso negado", 403);
    }

    await taskRepository.delete(id);
  }
}

module.exports = new TaskService();
