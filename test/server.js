import { createServer } from "http";
import { Server } from "socket.io";
import CompactParser from "../dist/index.min.js";
import { readFile } from "fs/promises";
import { join } from "path";

const server = createServer(async (req, res) => {
    try {
        if (req.method === "GET") {
            let filePath;
            if (req.url === "/") {
                filePath = join(import.meta.dirname, "index.html")
                res.setHeader("Content-Type","text/html")
            } else if (req.url === "/browser.min.js") {
                filePath = join(import.meta.dirname, "../", "dist", "browser.min.js")
                res.setHeader("Content-Type","text/javascript")
            } else {
                throw new Error("Not found")
            }
            const data = await readFile(filePath)
            res.write(data)
            res.end()

        }
        else {
            throw new Error("Method not allowed")
        }
    } catch (error) {
        res.writeHead("500", { "Content-Type": "text/plain" })
        res.end("internal server error" + " " + error)
    }
});
const io = new Server(server, {
  parser: CompactParser
});

io.on("connection", (socket) => {
  socket.on("ping", (data) => {
    console.info("Get from client: ", data);
    socket.emit("pong", { message: "Hello from Server!" });
  });
});

server.listen(3000);
console.info("Socket.io server running on port 3000");
