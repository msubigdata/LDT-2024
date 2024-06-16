import { z } from "zod";

export const fileSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_date: z.string(),
  camera: z.number(),
});

export type FileType = z.infer<typeof fileSchema>;
