const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { idSchema } = require("../validations/taskValidation");
const { querySchema } = require("../validations/taskValidation");
const { createTaskSchema } = require("../validations/taskValidation");
const { updateTaskSchema } = require("../validations/taskValidation");

const taskController = require("../controllers/taskController");

router.use(authMiddleware);

router.get("/tasks", validate(querySchema, "query"), taskController.getAll);
router.get("/tasks/:id", validate(idSchema, "params"), taskController.getById);
router.post("/tasks", validate(createTaskSchema), taskController.create);

router.put(
  "/tasks/:id",
  validate(idSchema, "params"),
  validate(updateTaskSchema),
  taskController.update,
);

router.delete(
  "/tasks/:id",
  validate(idSchema, "params"),
  taskController.remove,
);

module.exports = router;
