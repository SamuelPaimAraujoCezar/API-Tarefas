const createAndLoginUser = require("../../helpers/auth");
const { createTask } = require("../../helpers/task");

let token;

describe("POST /api/tasks", () => {
  beforeAll(async () => {
    const auth = await createAndLoginUser();
    token = auth.token;
  });

  it("should create a new task", async () => {
    const response = await createTask(token, {
      title: "Estudar Jest",
    });

    const task = response.body.dados;

    expect(response.status).toBe(201);
    expect(task.title).toBe("Estudar Jest");
  });

  it("should return 400 when title is missing", async () => {
    const response = await createTask(token, {
      title: undefined,
    });

    expect(response.status).toBe(400);
  });

  it("should return 401 without token", async () => {
    const response = await createTask(null);

    expect(response.status).toBe(401);
  });
});
