
// tipados para todos los eventos que se emitan desde el servidor al cliente

import IMessage from "@/interfaces/IMessage";
import IRoom from "./IRoom";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

// types for all events emitted from the client to the server
// ⚠️ note that if you use socket.on on frontend if the type event is not down here it will not work ⚠️
export interface ClientToServerEvents {
    joinRoom: (data: IRoom) => void;
    newMessage: (data: IMessage) => void;
    replyMessage: (data: IMessage) => void;
}

export interface InterServerEvents {
    ping: () => void;
    disconnect: () => void;
    ok: (data: string) => void;
}

export interface SocketData {
    name: string;
    age: number;
}