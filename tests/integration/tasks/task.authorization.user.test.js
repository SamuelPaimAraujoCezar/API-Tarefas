const createAndLoginUser = require("../../helpers/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../../helpers/task");

describe("Task Authorization (User A vs User B)", () => {
  let userAToken;
  let userBToken;
  let userATaskId;
  let userBTaskId;

  beforeEach(async () => {
    const userA = await createAndLoginUser();
    const userB = await createAndLoginUser();

    userAToken = userA.token;
    userBToken = userB.token;

    const taskAResponse = await createTask(userAToken, {
      title: "Task A",
    });

    userATaskId = taskAResponse.body.dados._id;

    const taskBResponse = await createTask(userBToken, {
      title: "Task B",
    });

    userBTaskId = taskBResponse.body.dados._id;
  });

  it("User A não deve acessar task do User B", async () => {
    const response = await getTaskById(userAToken, userBTaskId);

    expect(response.status).toBe(403);
  });

  it("User A não deve atualizar task do User B", async () => {
    const response = await updateTask(userAToken, userBTaskId, {
      title: "Hack attempt",
    });

    expect(response.status).toBe(403);
  });

  it("User A não deve deletar task do User B", async () => {
    const response = await deleteTask(userAToken, userBTaskId);

    expect(response.status).toBe(403);
  });

  it("User A deve ver apenas suas tasks", async () => {
    const response = await getTasks(userAToken);

    const titles = response.body.dados.map((task) => task.title);

    expect(titles).toContain("Task A");
    expect(titles).not.toContain("Task B");
  });
});
