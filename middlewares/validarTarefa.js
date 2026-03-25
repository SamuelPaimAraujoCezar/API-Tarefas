function validarNome(nome) {
  if (!nome) {
    return "Nome é obrigatório";
  }

  if (nome.length < 3) {
    return "Nome deve ter pelo menos 3 caracteres";
  }

  if (nome.length > 50) {
    return "Nome deve ter no máximo 50 caracteres";
  }

  return null;
}

function validarTarefa(req, res, next) {
  const { nome } = req.body;

  const erro = validarNome(nome);

  if (erro) {
    return res.status(400).json({
      sucesso: false,
      erro,
    });
  }

  next();
}

module.exports = validarTarefa;
