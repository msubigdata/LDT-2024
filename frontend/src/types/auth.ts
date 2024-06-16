import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().max(24),
  password: z.string().max(24),
});

export type UserAuth = z.infer<typeof credentialsSchema>;

export const userInfoSchema = z.object({
  first_name: z.string().max(255),
  last_name: z.string().max(255),
  username: z.string().max(255),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
