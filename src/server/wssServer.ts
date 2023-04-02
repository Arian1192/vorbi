import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { appRouter } from './routers/_app';

function generateUniqueId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export const clientMap = new Map()
const wss = new ws.Server({ port: 3001 });
const handler = applyWSSHandler({ wss, router: appRouter, createContext: () => ({}) });
wss.on('connection', (client) => {
    const clientId = generateUniqueId()
    clientMap.set(clientId, client)
    console.log(`➕➕ Connection (${wss.clients.size}) ${clientId}`);
    wss.setMaxListeners(wss.clients.size);
    client.once('close', () => {
        clientMap.delete(clientId);
        console.log(`➖➖ Connection (${wss.clients.size})`);

    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});