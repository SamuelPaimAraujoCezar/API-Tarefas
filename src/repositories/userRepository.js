const User = require("../models/User");

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async create(data) {
    return await User.create(data);
  }
}

module.exports = new UserRepository();
