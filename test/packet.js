import { Encoder, Decoder } from "../dist/index.min.js";

const encoder = new Encoder();
const decoder = new Decoder();

const packet = {
    type: 2, // EVENT
    nsp: "/chat",
    data: [
        "message",
        {
            userId: 123,
            username: "test",
            message: "Hello World!",
            meta: {
                mentions: ["alice", "bob"],
                urgent: false
            }
        }
    ],
    id: 42
};

const encodedPacket = encoder.encode(packet);
console.info("Encoded Packet (UTF-8):", encodedPacket.toString('UTF-8'));
