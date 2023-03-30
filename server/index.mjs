import express from "express";
import { randomInt, randomUUID } from "crypto";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static files.
app.use(express.static(process.env.STATIC_DIR || "dist/web"));

// {id: secret}
const rooms = new Map();
const create_room = () => {
  const room = {
    id: randomInt(10000, 99999),
    secret: randomUUID(),
  };
  rooms.set(room.id, room.secret);

  return room;
};

io.on("connection", (socket) => {
  socket.on("create_room", (_, callback) => {
    const room = create_room();
    console.log(`\n  [i] Created new room (id=${room.id})`);

    callback(room);
  });

  socket.on("join_room", (room, callback) => {
    // Does the room exist?
    if (rooms.get(Number(room))) {
      socket.join(room);
      callback(200);
    } else {
      callback(404);
    }
  });

  socket.on("send_app", ({ content, room, secret }, callback) => {
    //console.debug(`\n  [d] Received send_app (room=${room}, secret=${secret})`);

    // Either the room does not exists or the sender is not authorized.
    if (!rooms.has(Number(room))) {
      console.warn(
        `\n  [✘] Invalid broadcast request.\n      Room ${room} not found.\n      Address: ${
          socket.request.socket.address().address
        }`
      );

      callback(404);
      return;
    }
    if (rooms.get(Number(room)) !== secret) {
      console.warn(
        `\n  [✘] Unauthorized broadcast request.\n      Address: ${
          socket.request.socket.address().address
        }`
      );

      callback(403);
      return;
    }

    //console.debug("  [d] Authorized.\n      Broadcasting code to the room...");

    io.to(room).emit("payload", content);
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`\n  [✓] Server running at: http://localhost:${port}`);
});
