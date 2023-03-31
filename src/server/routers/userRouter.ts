// este es un subrouter de ejemplo
import { z } from 'zod'
import { procedure, router } from '../trpc'
import fetch from 'node-fetch'
import { UseTRPCQueryResult } from '@trpc/react-query/shared'
import { TRPCClientError } from '@trpc/client'


const getUserData = 
procedure.input(
        z.object({
            userId: z.string(),
        }),
    )
    .query(async ({ input }) => {
        // backend api
        const secret = process.env.CLERK_SECRET_KEY
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


export const userRouter = router({
    getUserData: getUserData
})

// export type definition of Api
export type UseRouter = typeof userRouter





