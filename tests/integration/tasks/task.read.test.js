const createAndLoginUser = require("../../helpers/auth");
const { createTask, getTasks, getTaskById } = require("../../helpers/task");

let token;

describe("GET /api/tasks", () => {
  beforeAll(async () => {
    const auth = await createAndLoginUser();
    token = auth.token;
  });

  it("should return a list of tasks", async () => {
    await createTask(token);
    await createTask(token);

    const response = await getTasks(token);

    const tasks = response.body.dados;

    expect(response.status).toBe(200);
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(2);
  });

  it("should return a task by id", async () => {
    const created = await createTask(token);

    const response = await getTaskById(token, created.body.dados._id);

    const task = response.body.dados;

    expect(response.status).toBe(200);
    expect(task._id).toBe(created.body.dados._id);
  });

  it("should return 404 for non-existing task", async () => {
    const response = await getTaskById(token, "507f1f77bcf86cd799439011");

    expect(response.status).toBe(404);
  });

  it("should return 401 without token", async () => {
    const response = await getTasks(null);

    expect(response.status).toBe(401);
  });
});
