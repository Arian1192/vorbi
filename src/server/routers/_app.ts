// Este es el Main appRouter
import { userRouter } from '../routers/userRouter'
// import { wsRouter } from '../routers/wsRouter'
import { socketRouter } from '../routers/socketRouter'
import { router } from '../trpc'

export const appRouter = router({
    getUserData: userRouter.getUserData,
    socketRouter: socketRouter
})

// export type definition of Api
export type AppRouter = typeof appRouter