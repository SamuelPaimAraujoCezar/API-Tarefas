const authService = require("../services/authService");

async function register(req, res) {
  const user = await authService.register(req.body);

  return res.status(201).json({
    sucesso: true,
    dados: user,
  });
}

async function login(req, res) {
  const { user, token } = await authService.login(req.body);

  return res.json({
    sucesso: true,
    dados: { user, token },
  });
}

module.exports = { register, login };
