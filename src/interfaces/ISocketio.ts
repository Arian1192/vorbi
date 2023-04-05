
// tipados para todos los eventos que se emitan desde el servidor al cliente

import IMessage from "@/interfaces/IMessage";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    ok: (data: string) => void;
    
}

// tipados para todos los eventos que se emitan desde el cliente al servidor
export interface ClientToServerEvents {
    joinRoom: (roomId: string, userId: string | undefined, previousRoom:string) => void;
    newMessage: (data: IMessage) => void;
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