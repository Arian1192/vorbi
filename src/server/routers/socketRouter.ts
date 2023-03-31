import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";
import { procedure, router } from "../trpc";
import IMessage from "@/interfaces/IMessage";

const ee = new EventEmitter();

export const socketRouter = router({
    onMessage: procedure.subscription(() => {
        return observable<IMessage>((emit) => {
            const onMessage = (message: IMessage) => {
                    // emit data to client
                    emit.next(message);
            };
            ee.on("newMessage", onMessage);
            return () => {
                ee.off("newMessage", onMessage);
            };
        }
        );
    }),

    onNotification: procedure.subscription(() =>{
        return observable<IMessage>((emit) => {
            const callback = ( data : IMessage) =>{
                emit.next(data)
            };
            ee.on('newNotification', callback);
            return() =>{
                ee.off('newNotification', callback)
            }
        })
    }),

    message: procedure.input(
        z.object({
            id: z.string().optional(),
            text: z.string().min(1),
            urlimageProfile : z.string().optional(),
            date: z.string()
        }),
    ).mutation(async ({ input }) => {
        // TODO Create a instance of Conversation and save to mongoDB before emit
        // TODO : add to database
        const post = { ...input };
        ee.emit("newMessage", post)
        ee.emit("newNotification",post)
        return post;
    }),

})

// export type definition of Api
export type SocketRouter = typeof socketRouter