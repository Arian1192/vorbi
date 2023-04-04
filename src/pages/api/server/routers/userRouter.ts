// este es un subrouter de ejemplo
import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.CLERK_SECRET_KEY
export const userRouter = router({
    getUserData: publicProcedure.input(
        z.object({
            userId: z.string(),
        }),
    )
        .query(async ({ input }) => {
            console.log('input', input)
            console.log('secret', secret)
            const response = await fetch(`https://api.clerk.dev/v1/users/${input.userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${secret}`
                },
            })
            if (!response.ok) {
                throw new Error(`Error al obtener los datos del usuario ${response.status} ${response.statusText}`)
            }
            const data: any = await response.json()
            return data
        })
})


// export type definition of Api
export type UserRouter = typeof userRouter





