import { app } from "./app";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = 8000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
