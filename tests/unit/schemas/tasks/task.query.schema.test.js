const { querySchema } = require("../../../../src/validations/taskValidation");

describe("Query Schema", () => {
  it("should parse valid query", () => {
    const result = querySchema.safeParse({
      completed: "true",
      page: "2",
      limit: "5",
      sort: "createdAt",
      order: "desc",
    });

    expect(result.success).toBe(true);
    expect(result.data.completed).toBe(true);
    expect(result.data.page).toBe(2);
  });

  it("should apply default values", () => {
    const result = querySchema.safeParse({});

    expect(result.success).toBe(true);
    expect(result.data.page).toBe(1);
    expect(result.data.limit).toBe(10);
  });

  it("should fail with invalid completed", () => {
    const result = querySchema.safeParse({
      completed: "abc",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid page", () => {
    const result = querySchema.safeParse({
      page: "abc",
    });

    expect(result.success).toBe(false);
  });

  it("should fail with invalid sort", () => {
    const result = querySchema.safeParse({
      sort: "invalid",
    });

    expect(result.success).toBe(false);
  });
});
