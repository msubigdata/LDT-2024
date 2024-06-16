import { z } from "zod";

export const cameraSchema = z.object({
  id: z.number(),
  title: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  location: z.number(),
});

export type Camera = z.infer<typeof cameraSchema>;
