const Task = require("../models/Task");

class TaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findAll({ page, limit, filters, sort }) {
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filters).sort(sort).skip(skip).limit(limit);

    const total = await Task.countDocuments(filters);

    return {
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id, userId) {
    return await Task.findOne({ _id: id, userId });
  }

  async update(id, data, userId) {
    return await Task.findOneAndUpdate({ _id: id, userId }, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id, userId) {
    return await Task.findOneAndDelete({ _id: id, userId });
  }
}

module.exports = new TaskRepository();
