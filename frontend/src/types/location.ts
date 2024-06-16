import { z } from "zod";

export const locationSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type Location = z.infer<typeof locationSchema>;