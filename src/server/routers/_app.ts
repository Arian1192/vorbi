// Este es el Main appRouter
import { router } from '../trpc'
import { userRouter } from '../routers/userRouter'
import { socketRouter } from '../routers/socketRouter'
import { roomRouter } from './roomRouter'

export const appRouter = router({
    getUserData: userRouter.getUserData,
    socketRouter: socketRouter,
    roomRouter: roomRouter
})

// export type definition of Api
export type AppRouter = typeof appRouter