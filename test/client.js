import { io } from "socket.io-client";
import CompactParser from "../dist/index.min.js";

const socket = io("ws://127.0.0.1:3000", {
  parser: CompactParser
});

socket.on("connect", () => {
  socket.emit("ping", { message: "Hello from Client!" });
});

socket.on("pong", (data) => {
  console.info("Get from Server: ", data);
  socket.disconnect();
});
