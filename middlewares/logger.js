function logger(req, res, next) {
  const metodo = req.method;
  const url = req.url;
  const data = new Date().toISOString();

  console.log(`[${data}] ${metodo} ${url}`);

  next();
}

module.exports = logger;
