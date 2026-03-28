import { io, Socket } from "socket.io-client";

// this sends the "connection" request to the ws server.
export const socket: Socket = io("http://localhost:8000");
