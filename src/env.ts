import { createEnv } from "@t3-oss/env-nextjs"
import * as z from "zod"

export const env = createEnv({
    client: {
        // BACKEND_URL: z.url(),
        // FRONTEND_URL: z.url(),
        NEXT_PUBLIC_API_URL: z.string().url(),
        // AUTH_URL: z.url(),
    },

    server: {},

    runtimeEnv: {
        // BACKEND_URL: process.env.BACKEND_URL,
        // FRONTEND_URL: process.env.FRONTEND_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        // AUTH_URL: process.env.AUTH_URL,
    }
})