const User = require("../../../src/models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../src/config/env");

const createAndLoginUser = require("../../helpers/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../../helpers/task");

describe("Task Authorization - ADMIN", () => {
  let adminToken;
  let userToken;
  let userTask;

  beforeEach(async () => {
    const user = await createAndLoginUser();

    userToken = user.token;

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
      role: "ADMIN",
    });

    adminToken = jwt.sign({ id: admin._id, role: "ADMIN" }, JWT_SECRET);

    const taskResponse = await createTask(userToken, {
      title: "Task do usuário",
    });

    userTask = taskResponse.body.dados;
  });

  it("ADMIN deve acessar task de qualquer usuário", async () => {
    const response = await getTaskById(adminToken, userTask._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.dados._id).toBe(userTask._id);
  });

  it("ADMIN deve atualizar task de qualquer usuário", async () => {
    const response = await updateTask(adminToken, userTask._id, {
      title: "Atualizado pelo admin",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.dados.title).toBe("Atualizado pelo admin");
  });

  it("ADMIN deve deletar task de qualquer usuário", async () => {
    const response = await deleteTask(adminToken, userTask._id);

    expect(response.statusCode).toBe(204);
  });

  it("ADMIN deve listar todas as tasks", async () => {
    await createTask(userToken, {
      title: "Outra task",
    });

    const response = await getTasks(adminToken);

    const tasks = response.body.dados;

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(2);
  });
});
