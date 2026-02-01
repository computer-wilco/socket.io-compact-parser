# socket.io-compact-parser

A super efficient, high-performance binary parser for Socket.IO based on the MessagePack specification.

This parser is designed to be a modern, lightweight replacement for the default JSON parser, significantly reducing the payload size of real-time Socket.IO communication while remaining fully protocol-compatible.

## The Logic: Positional Compaction
Instead of just shortening keys, this version maps `type`, `nsp`, `data`, and `id` to fixed array indices. By stripping keys entirely before encoding with `notepack.io`, overhead is reduced to the absolute physical minimum.

## Performance (Latest Benchmarks)

### Size (bytes)
#### Small Case
- JSON: 29
- MsgPack: 36
- Compact: 22
#### Medium Case
- JSON: 133
- MsgPack: 111
- Compact: 97
#### Large Case
- JSON: 10697
- MsgPack: 6921
- Compact: 6907

### Speed (Encoding)
- Small: 0.465ms
- Medium: 0.101ms
- Large: 5.007ms

## Installation

### Node.js (npm)
```bash
npm install socket.io-compact-parser
```

### Browser (CDN)
You can include the parser directly in your HTML via unpkg.

```html
<script src="https://unpkg.com/socket.io-compact-parser/dist/browser.min.js"></script>
```

## Usage

### Node.js Server (ESM)
```js
import { Server } from "socket.io";
import CompactParser from "socket.io-compact-parser";

const io = new Server(server, {
  parser: CompactParser
});
```

### Client (Module)
```js
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

## Features
- Supports both ES Modules (ESM) and CommonJS (CJS).
- Keyless binary encoding (Array-indexed).
- Full Socket.IO Protocol v5 compatibility.
- Automatic Buffer/Uint8Array handling via [notepack.io](https://www.npmjs.com/notepack.io).
- Minimal browser footprint with [@socket.io/component-emitter](https://www.npmjs.com/@socket.io/component-emitter).

## License

This project is licensed under the MIT License.

## Contributors

- **Wilco Joosen** ([computer-wilco](https://github.com/computer-wilco))
