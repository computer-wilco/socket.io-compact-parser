import { Encoder as DefaultEncoder } from "socket.io-parser";
import { Encoder as MsgPackEncoder } from "socket.io-msgpack-parser";
import { Encoder as CompactEncoder } from "../dist/index.min.js";

const small = {
  type: 2,
  nsp: "/",
  data: ["ping", { t: Date.now() }]
}

const medium = {
  type: 2,
  nsp: "/chat",
  data: [
    "message",
    {
      userId: 123,
      username: "test",
      message: "Hello World!",
      room: "general",
      flags: { urgent: false, system: false }
    }
  ],
};

const large = {
  type: 2,
  nsp: "/chat",
  data: [
    "bulk",
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      text: `message ${i}`,
      user: {
        id: i % 10,
        name: `user-${i % 10}`
      },
      meta: {
        edited: false,
        tags: ["a", "b", "c"]
      }
    }))
  ],
};

function sizeOfEncoded(encoder, packet) {
  const encoded = encoder.encode(packet);
  return encoded.reduce((sum, chunk) => {
    if (typeof chunk === "string") {
      return sum + Buffer.byteLength(chunk);
    }
    return sum + chunk.byteLength;
  }, 0);
}

const encoders = {
  "socket.io-parser": new DefaultEncoder(),
  "socket.io-msgpack-parser": new MsgPackEncoder(),
  "socket.io-compact-parser": new CompactEncoder()
};

const cases = {
  small,
  medium,
  large
};

const results = [];

for (const [name, packet] of Object.entries(cases)) {
  const row = { case: name };
  for (const [parserName, encoder] of Object.entries(encoders)) {
    row[parserName] = sizeOfEncoded(encoder, packet);
  }
  results.push(row);
}

console.table(results);
