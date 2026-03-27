const { PORT } = require("./config/env");

const app = require("./app");
const connectDB = require("./database");

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

startServer();
