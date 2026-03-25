require("dotenv").config();
const express = require("express");
const app = express();

const tarefasRoutes = require("./routes/tarefasRoutes");
const tarefasService = require("./tarefas");

app.use(express.json());
app.use("/api", tarefasRoutes);

app.get("/", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API de tarefas funcionando",
  });
});

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

async function iniciarServidor() {
  await tarefasService.carregarTarefas();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

iniciarServidor();
