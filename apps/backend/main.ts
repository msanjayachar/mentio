import { app } from "./app";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = 8000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
  },
});
const currentSlide = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    const participants = io.sockets.adapter.rooms.get(roomId);
    const participantsArr = participants ? Array.from(participants) : [];

    // socket.emit("participants", participantsArr);
    io.to(roomId).emit("participants", participantsArr);
  });

  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      if (roomId === socket.id) continue;

      const participants = io.sockets.adapter.rooms.get(roomId);
      const participantsArr = participants ? Array.from(participants) : [];

      // socket.emit("participants", participantsArr);
      io.to(roomId).emit("participants", participantsArr);
    }
  });

  socket.on("send-slide", ({ roomId, slide }) => {
    currentSlide.set(roomId, slide);

    // send to everyone except sender.
    socket.to(roomId).emit("receive-slide", slide);
  });

  socket.on("get-current-slide", (roomId) => {
    const slide = currentSlide.get(roomId);

    if (slide) {
      socket.emit("receive-slide", slide);
    }
  });

  socket.on("submit-answer", ({ roomId, questionId, answer }) => {
    io.to(roomId).emit("answer-submitted", {
      questionId,
      answer,
      participantId: socket.id,
    });
  });

  socket.on("presentation-end", ({ roomId }) => {
    socket.to(roomId).emit("presentation-ended");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
