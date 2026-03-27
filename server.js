const { PORT } = require("./config/server");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

require("./database/database");
const express = require("express");

const app = express();

const tarefasRoutes = require("./routes/tarefasRoutes");

app.use(express.json());
app.use("/api", tarefasRoutes);
app.use(logger);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API de tarefas funcionando",
  });
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
