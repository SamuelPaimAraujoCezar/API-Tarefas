const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const AppError = require("../errors/AppError");

const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../config/env");

const userRepository = require("../repositories/userRepository");
const refreshTokenRepository = require("../repositories/refreshTokenRepository");

class AuthService {
  async register(data) {
    const userExists = await userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Usuário já existe", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return this._generateTokens(user);
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas", 401);
    }

    return this._generateTokens(user);
  }

  async refresh(refreshToken) {
    const stored = await refreshTokenRepository.findByToken(refreshToken);

    if (!stored) {
      throw new AppError("Refresh token inválido", 401);
    }

    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

      await refreshTokenRepository.deleteByToken(refreshToken);

      const tokens = this._generateTokens({ _id: decoded.id });

      return tokens;
    } catch {
      throw new AppError("Refresh token inválido", 401);
    }
  }

  async logout(refreshToken) {
    await refreshTokenRepository.deleteByToken(refreshToken);
  }

  async _generateTokens(user) {
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user._id, jti: crypto.randomUUID() },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    await refreshTokenRepository.create({
      token: refreshToken,
      userId: user._id,
    });

    return {
      user: user.name
        ? {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        : undefined,
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthService();
