import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { appRouter } from './routers/_app';
const wss = new ws.Server({ port: 3001 });
const handler = applyWSSHandler({ wss, router: appRouter, createContext: () => ({}) });
wss.on('connection', (client) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    wss.setMaxListeners(wss.clients.size);
    client.once('close', () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});