const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../../src/app");

const { JWT_SECRET } = require("../../../src/config/env");

describe("Auth Middleware", () => {
  it("deve retornar 401 para token expirado", async () => {
    const expiredToken = jwt.sign({ id: "fakeUserId" }, JWT_SECRET, {
      expiresIn: "-1s",
    });

    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
  });
});
