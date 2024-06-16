import { z } from "zod";

export const locationSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type LocationType = z.infer<typeof locationSchema>;