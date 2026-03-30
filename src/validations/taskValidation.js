const { z } = require("zod");

const idSchema = z.object({
  id: z
    .string()
    .length(24, "ID inválido")
    .regex(/^[0-9a-fA-F]+$/, "ID inválido"),
});

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),

  completed: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),

  title: z.string().optional(),

  sort: z.enum(["dueDate", "createdAt", "title"]).optional().default("dueDate"),

  order: z.enum(["asc", "desc"]).optional().default("asc"),
});

const createTaskSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  dueDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Data inválida",
    }),
});

const updateTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    dueDate: z
      .string()
      .optional()
      .refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Data inválida",
      }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualização",
  });

module.exports = {
  idSchema,
  querySchema,
  createTaskSchema,
  updateTaskSchema,
};
