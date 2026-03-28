function validate({ body, params, query }) {
  return (req, res, next) => {
    try {
      if (body) req.body = body.parse(req.body);
      if (params) req.params = params.parse(req.params);
      if (query) req.query = query.parse(req.query);

      return next();
    } catch (error) {
      const errors = error.issues.map((err) => ({
        campo: err.path[0],
        mensagem: err.message,
      }));

      return res.status(400).json({
        sucesso: false,
        erros: errors,
      });
    }
  };
}

module.exports = validate;
