const request = require("supertest");
const app = require("../../../src/app");

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email: `teste${Date.now()}@email.com`,
        password: "123456",
      });

    expect(response.status).toBe(201);

    const data = response.body.dados;

    expect(data.user).toBeDefined();
    expect(data.accessToken).toBeDefined();
    expect(data.refreshToken).toBeDefined();
  });

  it("should not allow duplicate email", async () => {
    const email = `teste${Date.now()}@email.com`;

    await request(app).post("/api/auth/register").send({
      name: "Teste",
      email,
      password: "123456",
    });

    const response = await request(app).post("/api/auth/register").send({
      name: "Teste",
      email,
      password: "123456",
    });

    expect(response.status).toBe(409);
  });

  it("should return 400 with invalid email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Teste",
      email: "email-invalido",
      password: "123456",
    });

    expect(response.status).toBe(400);
  });

  it("should return 400 when password is too short", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Teste",
        email: `teste${Date.now()}@email.com`,
        password: "123",
      });

    expect(response.status).toBe(400);
  });

  it("should return 400 when body is empty", async () => {
    const response = await request(app).post("/api/auth/register").send({});

    expect(response.status).toBe(400);
  });
});
