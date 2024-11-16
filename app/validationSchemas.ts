import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  userId: z
    .string()
    .min(1, "userId is required")
    .max(255)
    .optional()
    .nullable(),
  // status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});
