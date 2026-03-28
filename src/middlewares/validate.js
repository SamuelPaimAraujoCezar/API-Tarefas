function validate(schema, type = "body") {
  return (req, res, next) => {
    try {
      schema.parse(req[type]);
      next();
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
