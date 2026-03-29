import { app } from "./app";
import { Server } from "socket.io";
import { createServer } from "node:http";

const generateId = () => {
  const randomId = Math.floor(Math.random() * 999999);

  const stringRandomId = randomId.toString();

  return stringRandomId;
};

const port = 8000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("create-room", () => {
    const roomId = generateId();

    socket.emit("room-created", roomId);
  });

  // Q: How to persist this room?
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    socket.emit("joined-room", roomId);
  });

  socket.on("get-participants", async (roomId) => {
    const participants = io.sockets.adapter.rooms.get(roomId);
    const participantsArr = participants ? Array.from(participants) : [];

    socket.emit("participants", participantsArr);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
