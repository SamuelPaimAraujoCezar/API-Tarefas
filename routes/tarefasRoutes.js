const express = require("express");
const router = express.Router();

const tarefasController = require("../controllers/tarefasController");
const validarTarefa = require("../middlewares/validarTarefa");

router.get("/tarefas", tarefasController.listarTarefas);
router.get("/tarefas/:id", tarefasController.buscarTarefa);
router.post("/tarefas", validarTarefa, tarefasController.criarTarefa);
router.put("/tarefas/:id", validarTarefa, tarefasController.atualizarTarefa);
router.delete("/tarefas/:id", tarefasController.deletarTarefa);

module.exports = router;
