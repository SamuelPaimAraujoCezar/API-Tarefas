const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const { JWT_SECRET } = require("../config/env");

class AuthService {
  async register({ name, email, password }) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new AppError("Usuário já existe", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return { user, token };
  }
}

module.exports = new AuthService();
