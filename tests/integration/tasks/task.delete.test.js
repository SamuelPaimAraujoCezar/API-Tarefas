const createAndLoginUser = require("../../helpers/auth");
const { createTask, deleteTask, getTaskById } = require("../../helpers/task");

let token;

describe("DELETE /api/tasks/:id", () => {
  beforeAll(async () => {
    const auth = await createAndLoginUser();
    token = auth.token;
  });

  it("should delete a task", async () => {
    const created = await createTask(token);

    const response = await deleteTask(token, created.body.dados._id);

    expect(response.status).toBe(204);

    const check = await getTaskById(token, created.body.dados._id);
    expect(check.status).toBe(404);
  });

  it("should return 404 for non-existing task", async () => {
    const response = await deleteTask(token, "507f1f77bcf86cd799439011");

    expect(response.status).toBe(404);
  });

  it("should return 401 without token", async () => {
    const created = await createTask(token);

    const response = await deleteTask(null, created.body.dados._id);

    expect(response.status).toBe(401);
  });
});
