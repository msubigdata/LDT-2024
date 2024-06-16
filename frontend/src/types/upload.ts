import { z } from "zod";

export const createFileSchema = z.object({
  location: z.string(),
  camera: z.string(),
});

export type CreateFileInput = z.infer<typeof createFileSchema>;
