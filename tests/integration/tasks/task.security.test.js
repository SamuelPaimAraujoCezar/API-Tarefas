const createAndLoginUser = require("../../helpers/auth");
const { createTask } = require("../../helpers/task");

describe("Task Security", () => {
  let token;

  beforeAll(async () => {
    const user = await createAndLoginUser();
    token = user.token;
  });

  it("não deve permitir criar task com userId manual", async () => {
    const response = await createTask(token, {
      title: "Tentativa de fraude",
      userId: "outro-user-id",
    });

    expect(response.body.dados.userId).not.toBe("outro-user-id");
  });
});
