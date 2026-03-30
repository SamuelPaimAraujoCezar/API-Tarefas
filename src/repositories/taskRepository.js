const Task = require("../models/Task");

class TaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findAll({ page, limit, filters, sort }) {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(filters).sort(sort).skip(skip).limit(limit),
      Task.countDocuments(filters),
    ]);

    return {
      dados: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id) {
    return await Task.findById(id);
  }

  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new TaskRepository();
