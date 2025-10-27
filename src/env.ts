import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_GOOGLE_CLIENT_ID: z.string()
})

export const env = envSchema.parse(import.meta.env)
