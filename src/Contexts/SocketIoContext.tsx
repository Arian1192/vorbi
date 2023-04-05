import React, { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import {
	ServerToClientEvents,
	ClientToServerEvents,
} from "@/interfaces/ISocketio";

export const SocketContext = createContext<{
	socket: Socket<ClientToServerEvents> | undefined;
}>({
	socket: undefined,
});

export const SocketContextProvider = ({ children }: any) => {
	const [socketClient, setSocketClient] = React.useState<
		Socket<ClientToServerEvents, ServerToClientEvents> | undefined
	>(undefined);

	useEffect(() => {
		const socketInit = async () => {
			await fetch("/api/socket");
			const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io();
			socket.on("connect", () => {
				console.log("connected");
				setSocketClient(socket);
			});
		};
		socketInit();
	}, []);

	const values = {
		socket: socketClient,
	};

	return (
		<SocketContext.Provider value={values}>{children}</SocketContext.Provider>
	);
};
