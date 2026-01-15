# socket.io-compact-parser

A super efficient, high-performance binary parser for Socket.IO based on the MessagePack specification.

This parser is designed to be a modern, lightweight replacement for the default JSON parser, significantly reducing the payload size of your real-time communication.

## Current State & Roadmap

**Current version:** 1.0.0
- Fully implements the Socket.IO Parser API.
- Powered by `notepack.io` for ultra-fast MessagePack encoding/decoding.
- Bundles `@socket.io/component-emitter` for a seamless browser experience.
- Supports both ES Modules (ESM) and CommonJS (CJS).

**Roadmap:**
- [ ] Implementation of custom dictionary-based text compression to further reduce string overhead.
- [ ] Integration with native browser CompressionStream API for large payloads.

## Installation

### Node.js (npm)
```bash
npm install socket.io-compact-parser
```

### Browser (CDN)
You can include the parser directly in your HTML via unpkg. It is bundled as a UMD module, making it available as a global variable.

```html
<script src="https://unpkg.com/socket.io-compact-parser/dist/browser.min.js"></script>
```

## Usage

### Node.js Server (ESM)
```javascript
import { Server } from "socket.io";
import CompactParser from "socket.io-compact-parser";

const io = new Server(server, {
  parser: CompactParser
});
```

### Client (Module)
```javascript
import { io } from "socket.io-client";
import CompactParser from "socket.io-compact-parser";

const socket = io({
  parser: CompactParser
});
```

### Client (Browser Global)
```html
<script src="/socket.io/socket.io.js"></script>
<script src="https://unpkg.com/socket.io-compact-parser/dist/browser.min.js"></script>
<script>
  const socket = io({
    parser: SocketIOCompactParser
  });
</script>
```

## Why use this parser?

The default Socket.IO parser uses JSON, which is text-based and can become quite large when sending complex objects or binary data. By using MessagePack via `socket.io-compact-parser`, your data is converted into a compact binary format, leading to:
- Lower bandwidth usage.
- Faster serialization/deserialization.
- Better handling of binary data (Buffers/Uint8Arrays).

## License

This project is licensed under the MIT License.

## Contributors

- **Wilco Joosen** ([computer-wilco](https://github.com/computer-wilco)) - Lead Developer
