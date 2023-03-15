import { io } from "socket.io-client";

export const socket = io({
  autoConnect: false,
});

// Check if socket is available
fetch("/socket.io/?EIO=4&transport=polling").then((result) => {
  if (result.ok) socket.connect();
});

// Returns {id: roomId, secret: sharedSecret}.
export const createRoom = async () => {
  return new Promise((resolve) => {
    socket.emit("create_room", {}, resolve);
  });
};
