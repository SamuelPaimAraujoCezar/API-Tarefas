const express = require("express");
const router = express.Router();

const tarefasService = require("../tarefas");
const validarTarefa = require("../middlewares/validarTarefa");

router.get("/tarefas", (req, res) => {
  res.json({
    sucesso: true,
    dados: tarefasService.listarTarefas(),
  });
});

router.get("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefasService.buscarTarefa(id);

  if (!tarefa) {
    return res.status(404).json({
      sucesso: false,
      erro: `Tarefa com id ${id} não encontrada`,
    });
  }

  res.json({
    sucesso: true,
    dados: tarefa,
  });
});

router.post("/tarefas", validarTarefa, async (req, res) => {
  const novaTarefa = await tarefasService.criarTarefa(req.body.nome);

  res.status(201).json({
    sucesso: true,
    dados: novaTarefa.tarefa,
  });
});

router.put("/tarefas/:id", validarTarefa, async (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;

  const resultado = await tarefasService.atualizarTarefa(id, nome);

  if (!resultado.tarefa) {
    return res.status(404).json({
      sucesso: false,
      erro: `Tarefa com id ${id} não encontrada`,
    });
  }

  res.json({
    sucesso: true,
    dados: resultado.tarefa,
  });
});

router.delete("/tarefas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sucesso = await tarefasService.deletarTarefa(id);

  if (!sucesso) {
    return res.status(404).json({
      sucesso: false,
      erro: `Tarefa com id ${id} não encontrada`,
    });
  }

  res.json({
    sucesso: true,
    dados: "Tarefa deletada com sucesso",
  });
});

module.exports = router;
