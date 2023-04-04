
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../pages/api/server/routers/_app'
import type { inferProcedureOutput } from '@trpc/server';

function getBaseURL() {
    // si estamos en el servidor devolvemos la url base
    if (typeof window !== 'undefined') {
        return ''
    }
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }
    // Si nada de esto ocurre se supone que estamos en locahost es decir en desarrollo
    return `http://localhost:${process.env.PORT || 3000}`
}


export const trpc = createTRPCReact<AppRouter>()
export type inferQueryOutput<
    TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
