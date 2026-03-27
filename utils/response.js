function successResponse(res, data, status = 200) {
  return res.status(status).json({
    sucesso: true,
    dados: data,
  });
}

module.exports = {
  successResponse,
};
