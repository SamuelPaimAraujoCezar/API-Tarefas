const request = require("supertest");
const app = require("../../src/app");

async function createAndLoginUser() {
  const email = `test${Date.now()}_${Math.random()}@example.com`;

  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password: "123456",
  });

  const response = await request(app).post("/api/auth/login").send({
    email,
    password: "123456",
  });

  return {
    token: response.body.dados.accessToken,
    user: response.body.dados.user,
  };
}

module.exports = createAndLoginUser;
