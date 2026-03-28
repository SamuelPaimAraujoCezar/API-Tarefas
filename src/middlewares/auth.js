const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const { JWT_SECRET } = require("../config/env");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Token inválido ou não fornecido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.id;

    return next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}

module.exports = authMiddleware;
