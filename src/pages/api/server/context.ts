import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getAuth } from '@clerk/nextjs/server'
import type { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/dist/api";

interface AppContext {
    auth: SignedInAuthObject | SignedOutAuthObject;
    socketId?: string;
}

// recoger el socketId del usuario y pasarlo al contexto

// para hacer eso necesitamos un middleware que se ejecute antes de cada procedure
// y que recoga el socketId del usuario y lo pase al contexto

export const createContextInner = async ({ auth, socketId }: AppContext) => {
    return {
        auth,
        socketId
    }
}

export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    return await createContextInner({ auth: getAuth(opts.req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
