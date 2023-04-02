import { observable } from "@trpc/server/observable";
import { EventEmitter } from "ws";
import { z } from "zod";
import { procedure, router } from "../trpc";
import IRoom from "@/interfaces/IRoom";
import { Observer } from "@trpc/server/observable/";
const ee = new EventEmitter();
const maxClients = 10
let rooms: { [key: string]: string[] } = {};
let contador = 0
export const roomRouter = router({
    onJoinRoom: procedure.subscription((ctx) => {
        const join = (roomId: string, userId: string, emit: Observer<IRoom, unknown>) => {
            contador++
            console.log("paso por join")
            console.log("contador ", contador)
            if (!rooms[roomId]) {
                rooms[roomId] = [];
            }
            if (rooms[roomId].includes(userId)) {
                console.log(`User with id ${userId} is already in Room`)
                return
            }
            if (rooms[roomId].length >= maxClients) {
                console.log(`No more clients are allowed at Room with id ${roomId}`);
            } else {
                rooms[roomId].push(userId);
                console.log(rooms)
                emit.next({ socketRoom: roomId, type: "Join", userId: userId })
                return
            }
        };


        return observable<IRoom>((emit) => {
            const callback = (data: any) => {
                const type: string = data.type
                const socketRoom: string = data.socketRoom
                const userId: string = data.userId
                switch (type) {
                    case "create":
                        // create();
                        break;
                    case "Join":
                        join(socketRoom, userId, emit)
                        break;
                    case "leave":
                        // leave():
                        break;
                    default:
                        console.warn(`Type: ${type} unknown`)
                        break;
                }

            }
            ee.on('message', callback)
            return () => {
                ee.off('message', callback)
                emit.complete()
            }
        })
    }),


    JoinRoom: procedure.input(
        z.object({
            socketRoom: z.string(),
            type: z.string(),
            userId: z.string()
        }),
    ).mutation(async ({ input }) => {
        const post = { ...input };
        console.log("post Room", post)
        ee.emit('message', post)
        return post;
    }),

})

export type RoomRouter = typeof roomRouter