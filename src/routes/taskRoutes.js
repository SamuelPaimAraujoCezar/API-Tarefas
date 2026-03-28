const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const {
  idSchema,
  querySchema,
  createTaskSchema,
  updateTaskSchema,
} = require("../validations/taskValidation");

const taskController = require("../controllers/taskController");

router.use(authMiddleware);

router.get("/tasks", validate({ query: querySchema }), taskController.getAll);

router.get(
  "/tasks/:id",
  validate({ params: idSchema }),
  taskController.getById,
);

router.post(
  "/tasks",
  validate({ body: createTaskSchema }),
  taskController.create,
);

router.put(
  "/tasks/:id",
  validate({ params: idSchema }),
  validate({ body: updateTaskSchema }),
  taskController.update,
);

router.delete(
  "/tasks/:id",
  validate({ params: idSchema }),
  taskController.remove,
);

module.exports = router;
