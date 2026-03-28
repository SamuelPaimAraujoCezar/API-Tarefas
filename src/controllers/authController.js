const authService = require("../services/authService");

class AuthController {
  async register(req, res) {
    const result = await authService.register(req.body);

    return res.status(201).json({
      sucesso: true,
      dados: result,
    });
  }

  async login(req, res) {
    const result = await authService.login(req.body);

    return res.json({
      sucesso: true,
      dados: result,
    });
  }

  async refresh(req, res) {
    const { refreshToken } = req.body;

    const result = await authService.refresh(refreshToken);

    return res.json({
      sucesso: true,
      dados: result,
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    return res.status(204).send();
  }
}

module.exports = new AuthController();
