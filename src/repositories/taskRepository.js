const Task = require("../models/Task");

class TaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findAll() {
    return await Task.find().sort({ dueDate: 1 });
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
