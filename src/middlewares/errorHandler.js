function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const mensagem = err.message || "Erro interno do servidor";

  res.status(status).json({
    sucesso: false,
    erro: mensagem,
  });
}

module.exports = errorHandler;
