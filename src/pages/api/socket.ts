// noinspection TypeScriptValidateTypes

import { SocketData, ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@/interfaces/ISocketio";
import { Server, Socket } from "socket.io";
import IMessage from "@/interfaces/IMessage";
import IRoom from "@/interfaces/IRoom";

export default function SocketHandler(req: any, res: any) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log("New client connected", socket.id);

    socket.on("newMessage", (data: IMessage) => {
      console.log(data)
      socket.to(data.socketRoom).emit("replyMessage", data);
    })

    socket.on("joinRoom", (data:IRoom) => {

      socket.leave(data.previousRoom);
      socket.join(data.socketRoom);
      console.log(`User ${data.userId} left ${data.previousRoom} and joined room ${data.socketRoom}`);
    });


    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });



  console.log("Setting up socket");
  res.end();
}