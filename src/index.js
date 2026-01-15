import { Emitter } from "@socket.io/component-emitter";
import notepack from "notepack.io";

/**
 * Utility functions for internal packet validation.
 * @private
 */
const isInteger = Number.isInteger;
const isString = (value) => typeof value === "string";
const isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";

/**
 * Validates the data payload based on the packet type.
 * @param {Object} decoded - The decoded packet object.
 * @returns {Boolean}
 * @private
 */
const isDataValid = (decoded) => {
  switch (decoded.type) {
    case PacketType.CONNECT:
      return decoded.data === undefined || isObject(decoded.data);
    case PacketType.DISCONNECT:
      return decoded.data === undefined;
    case PacketType.CONNECT_ERROR:
      return isString(decoded.data) || isObject(decoded.data);
    default:
      return Array.isArray(decoded.data);
  }
};

/**
 * The protocol version implemented by this parser.
 * @type {Number}
 */
export const protocol = 5;

/**
 * Packet types used by the Socket.IO protocol.
 * @enum {Number}
 */
export const PacketType = {
  CONNECT: 0,
  DISCONNECT: 1,
  EVENT: 2,
  ACK: 3,
  CONNECT_ERROR: 4,
};

/**
 * A MessagePack-based encoder for Socket.IO packets.
 * @class
 */
export class Encoder {
  /**
   * Encodes a packet into a MessagePack buffer.
   * @param {Object} packet - The Socket.IO packet object.
   * @returns {Array<Buffer|Uint8Array>} An array containing the encoded packet.
   */
  encode(packet) {
    return [notepack.encode(packet)];
  }
}

/**
 * A MessagePack-based decoder for Socket.IO packets.
 * Inherits event emission capabilities from Emitter.
 * @class
 */
export class Decoder {
  /**
   * Initializes a new Decoder instance.
   */
  constructor() {
    Emitter(this);
  }

  /**
   * Decodes a binary object and emits the "decoded" event.
   * @param {Buffer|Uint8Array|ArrayBuffer} obj - The binary data to decode.
   * @throws {Error} If the packet structure is invalid.
   */
  add(obj) {
    try {
      const decoded = notepack.decode(obj);
      this.checkPacket(decoded);
      this.emit("decoded", decoded);
    } catch (e) {
      this.emit("error", e);
    }
  }

  /**
   * Performs structural validation on the decoded packet.
   * @param {Object} decoded - The packet to validate.
   * @throws {Error} If any part of the packet fails validation.
   */
  checkPacket(decoded) {
    const isTypeValid =
      isInteger(decoded.type) &&
      decoded.type >= PacketType.CONNECT &&
      decoded.type <= PacketType.CONNECT_ERROR;

    if (!isTypeValid) throw new Error("invalid packet type");
    if (!isString(decoded.nsp)) throw new Error("invalid namespace");
    if (!isDataValid(decoded)) throw new Error("invalid payload");
    
    const isAckValid = decoded.id === undefined || isInteger(decoded.id);
    if (!isAckValid) throw new Error("invalid packet id");
  }

  /**
   * Cleans up the decoder instance by removing all event listeners.
   */
  destroy() {
    this.off();
  }
}

/**
 * Default export containing the parser specification.
 */
export default {
  protocol,
  PacketType,
  Encoder,
  Decoder
};
