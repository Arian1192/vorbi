// // aqui vamos a meter nuestro typesafe tRPC hooks
// // importamos httpBatchLink de @trpc/client para poder hacer batch requests
// import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink, } from '@trpc/client'
// // importamos el createTRPCNext from @trpc/next para poder usar el useQuery
// import { createTRPCNext } from '@trpc/next'
// import { create } from 'domain'
// // importamos el type de nuestro router principal para poder usarlo en el createTRPCNext
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/routers/_app'
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

// export const trpc = createTRPCNext<AppRouter>({
//     // ctx es el contexto que vamos a pasar a nuestros procedures y routers
//     config() {
//         return {
//             links: [
//                 // aqui vamos a meter el httpBatchLink para poder hacer batch requests
//                 httpBatchLink({
//                     url: `${getBaseURL()}/api/trpc/`,
//                     async headers() {
//                         return {
//                             // aqui vamos a meter los headers que queremos que se envien en cada request
//                             // por ejemplo cors headers
//                             'Content-Type': 'application/json',
//                             'Access-Control-Allow-Origin': '*',
//                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//                             'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`
//                         }
//                     }
//                 }),
//             ],
//             abortOnUnmount: true,
//         }
//     },
//     ssr: false
// })



// Esplit link para hacer batch requests y websockets pero no funciona

// export const trpc = createTRPCNext<AppRouter>({
//     config() {
//         return {
//             links: [
//                 splitLink({
//                     condition: op => {
//                         return op.type === 'subscription'
//                     },
//                     true: wsLink({
//                         client: createWSClient({
//                             url: 'ws://localhost:3001',

//                         })
//                     }),
//                     false: httpBatchLink({
//                         url: `${getBaseURL()}/api/trpc/`,
//                         async headers() {
//                             return {
//                                 // aqui vamos a meter los headers que queremos que se envien en cada request
//                                 // por ejemplo cors headers
//                                 'Content-Type': 'application/json',
//                                 'Access-Control-Allow-Origin': '*',
//                                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//                                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`
//                             }
//                         }
//                     })
//                 })
//             ]
//         }
//     },
// })


