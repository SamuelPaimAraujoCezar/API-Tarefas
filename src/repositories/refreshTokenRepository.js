const RefreshToken = require("../models/RefreshToken");

class RefreshTokenRepository {
  async create(data) {
    return await RefreshToken.create(data);
  }

  async findByToken(token) {
    return await RefreshToken.findOne({ token });
  }

  async deleteByToken(token) {
    return await RefreshToken.deleteOne({ token });
  }
}

module.exports = new RefreshTokenRepository();
