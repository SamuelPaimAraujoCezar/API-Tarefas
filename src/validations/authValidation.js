const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email("Email inválido"),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token é obrigatório"),
});

const logoutSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token é obrigatório"),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
};
