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

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Token expirado", 401);
    }

    throw new AppError("Token inválido", 401);
  }
}

function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Não autenticado", 401);
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      throw new AppError("Acesso negado", 403);
    }

    return next();
  };
}

module.exports = { authMiddleware, authorize };
