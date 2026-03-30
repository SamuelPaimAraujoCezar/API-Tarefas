const { logoutSchema } = require("../../../../src/validations/authValidation");

describe("Logout Schema", () => {
  it("should validate a valid refresh token", () => {
    const result = logoutSchema.safeParse({
      refreshToken: "valid-token",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when refreshToken is missing", () => {
    const result = logoutSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("should fail when refreshToken is empty", () => {
    const result = logoutSchema.safeParse({
      refreshToken: "",
    });

    expect(result.success).toBe(false);
  });
});
