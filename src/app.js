const express = require("express");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API de tarefas funcionando",
  });
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.use(errorHandler);

module.exports = app;
