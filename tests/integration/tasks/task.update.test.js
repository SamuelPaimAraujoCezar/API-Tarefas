const createAndLoginUser = require("../../helpers/auth");
const { createTask, updateTask } = require("../../helpers/task");

let token;

describe("PUT /api/tasks/:id", () => {
  beforeAll(async () => {
    const auth = await createAndLoginUser();
    token = auth.token;
  });

  it("should update a task", async () => {
    const created = await createTask(token);

    const response = await updateTask(token, created.body.dados._id, {
      title: "Atualizado",
    });

    const task = response.body.dados;

    expect(response.status).toBe(200);
    expect(task.title).toBe("Atualizado");
  });

  it("should update only provided fields", async () => {
    const created = await createTask(token, {
      description: "Original",
    });

    const response = await updateTask(token, created.body.dados._id, {
      title: "Novo título",
    });

    const task = response.body.dados;

    expect(response.status).toBe(200);
    expect(task.title).toBe("Novo título");
    expect(task.description).toBe("Original");
  });

  it("should return 400 when no fields are provided", async () => {
    const created = await createTask(token);

    const response = await updateTask(token, created.body.dados._id, {});

    expect(response.status).toBe(400);
  });

  it("should return 404 for non-existing task", async () => {
    const response = await updateTask(token, "507f1f77bcf86cd799439011", {
      title: "Teste",
    });

    expect(response.status).toBe(404);
  });

  it("should return 401 without token", async () => {
    const created = await createTask(token);

    const response = await updateTask(null, created.body.dados._id, {
      title: "Teste",
    });

    expect(response.status).toBe(401);
  });
});
