// import { createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client';
// import type { AppRouter } from '../server/routers/_app';

// export const wsClient = () => {
//     return createWSClient({
//         url: 'ws://localhost:3001',
//     });

// }

// export const client = createTRPCProxyClient<AppRouter>({
//     links: [wsLink<AppRouter>({ client: wsClient() })],
// });

export {}