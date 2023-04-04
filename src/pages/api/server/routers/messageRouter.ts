import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import IMessage from "@/interfaces/IMessage";
const ee = new EventEmitter();


// messageRouter Implementation

let sR = ""

export const messageRouter = router({
    // define a procedure
    // this is a public procedure it can be called from any client.
    message: publicProcedure.input(
        z.object({
            socketRoom: z.string(),
            text: z.string(),
            id: z.string().optional(),
            urlImageProfile: z.string().optional(),
            date: z.string()
        })
    ).mutation(async ({ input }) => {
        const { socketRoom } = input
        sR = socketRoom
        ee.emit(`newMessage.${sR}`, input);
        return input
    }),

    onNewMessage: publicProcedure.subscription(() => {
        return observable<IMessage>((emit) => {
            const callback = (data: IMessage) => {
                emit.next(data)
            }
            ee.on(`newMessage.${sR}`, callback)
            return () => {
                ee.off(`newMessage.${sR}`, callback)
                emit.complete()
            }
        })
    })
})








// export type definition of Api
export type MessageRouter = typeof messageRouter