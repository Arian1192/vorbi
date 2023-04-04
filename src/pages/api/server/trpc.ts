// aqui vamos atener los procedure Helpers
import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context"
const t = initTRPC.context<Context>().create()

const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You are not authorized to do this"
        })
    }
    return next({
        ctx: {
            auth: ctx.auth,

        }
    })
})

const socketInfo = t.middleware(({ next, ctx }) => {
    return next({
        ctx: {
            auth: ctx.auth,
            socketId: ctx.socketId
        }
    })
})



// Base router and procedure helpers
export const router = t.router // aqui vamos a meter nuestros routers
export const publicProcedure = t.procedure // aqui vamos a meter nuestros procedures Publicos
export const privateProcedure = t.procedure.use(isAuthed) // aqui vamos a meter nuestros procedures Privados