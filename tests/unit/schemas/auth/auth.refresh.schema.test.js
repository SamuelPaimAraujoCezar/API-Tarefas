const { refreshSchema } = require("../../../../src/validations/authValidation");

describe("Refresh Schema", () => {
  it("should validate a valid refresh token", () => {
    const result = refreshSchema.safeParse({
      refreshToken: "valid-token",
    });

    expect(result.success).toBe(true);
  });

  it("should fail when refreshToken is missing", () => {
    const result = refreshSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("should fail when refreshToken is empty", () => {
    const result = refreshSchema.safeParse({
      refreshToken: "",
    });

    expect(result.success).toBe(false);
  });
});
