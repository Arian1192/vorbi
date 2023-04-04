import { observable } from "@trpc/server/observable";
import { EventEmitter } from "ws";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import IRoom from "@/interfaces/IRoom";
import { Observer } from "@trpc/server/observable/";
const ee = new EventEmitter();
const maxClients = 10
export let rooms: { [key: string]: string[] } = {};
let contador = 0


export interface IRoomProps {
    userId: string;
    roomsToSend: { [key: string]: string[] };
    room: string
}

const join = (data: IRoom) => {
    const { socketRoom, userId, type, prevSocketIdRoom } = data;
    console.log("prevSocketIdRoom", prevSocketIdRoom)
    console.log("socketRoom", socketRoom)
    if (prevSocketIdRoom) {
        rooms[prevSocketIdRoom] = rooms[prevSocketIdRoom].filter((user) => user !== userId);
        // una vez hemos sacado el usuario de la sala previa lo metemos en la nueva
        rooms[socketRoom] = [userId];
    } else {
        // si no esta en la sala previa lo metemos en la nueva
        rooms[socketRoom] = [userId];

    }
    return rooms

}


export const roomRouter = router({
    onJoinRoom: publicProcedure.subscription(() => {
        return observable<IRoomProps>((emit) => {
            const callback = (data: IRoom) => {
                const type: string = data.type;
                const userId = data.userId
                const room = data.socketRoom
                if (type === "Join") {
                    // 
                    rooms = join(data)
                    const roomsToSend = rooms
                    emit.next({ userId, roomsToSend , room })
                }
            };
            ee.on("message", callback);
            return () => {
                ee.off("message", callback);
                emit.complete();
            };
        });
    }),

    JoinRoom: publicProcedure.input(
        z.object({
            prevSocketIdRoom: z.string().optional(),
            socketRoom: z.string(),
            type: z.string(),
            userId: z.string(),
        })
    ).mutation(async ({ input }) => {
        const { socketRoom, userId, type, prevSocketIdRoom } = input;
        console.log("prevSocketIdRoom nivel mutation", prevSocketIdRoom)
        ee.emit("message", { socketRoom, type, userId, prevSocketIdRoom });
        return input;
    }),
});


export type RoomRouter = typeof roomRouter;
