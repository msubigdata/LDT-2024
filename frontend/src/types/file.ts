import { z } from "zod";

export const fileSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.any(),
  created_date: z.string(),
  content: z.enum(["photo", "video"]),
  camera: z.number(),
});

export type FileType = z.infer<typeof fileSchema>;
