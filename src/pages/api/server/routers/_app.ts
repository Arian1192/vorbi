// Este es el Main appRouter
import { router } from '../trpc'
import { userRouter } from './userRouter'
import { messageRouter } from './messageRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
    getUserData: userRouter,
    messageRouter: messageRouter,
    roomRouter: roomRouter
})

// export type definition of Api
export type AppRouter = typeof appRouter