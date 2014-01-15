import constants = require("./constants");
import helpers = require("./helpers");
import security = require("./security");

export class Node {
    constructor(public name: string, public attrs: Object = {}, public childs: Node[] = [], public data: Uint8Array = null) {}
}


export class Packet {
    private packet: number[] = [];
    
    serialize(): Uint8Array {
        var len = this.packet.length;
        var array = new Uint8Array(len + 3);
        array[0] = (len & 0xFF0000) >> 16;
        array[1] = (len & 0xFF00) >> 8;
        array[2] = (len & 0xFF);
        for(var i = 0; i < this.packet.length; i++) {
            array[i+3] = this.packet[i];
        }
        return array;
    }
    
    writeBinaryXml(node: Node) {
        var length = 1;
        length += Object.keys(node.attrs).length * 2;
        if (node.childs.length) {
            length += 1;
        }
        if (node.data != null) {
            length += 1;
        }
        this.listStart(length);
        this.writeString(node.name);
        this.writeAttributes(node.attrs);
        
        if (node.data != null) {
            this.writeBytes(node.data);
        }
        
        if (node.childs.length) {
            this.listStart(node.childs.length);
            node.childs.forEach(child => this.writeBinaryXml(child));
        }
    }
    
    listStart(listLength: number): void {
        if (listLength == 0) {
            this.writeInt8(constants.LIST_EMPTY);
        } else if (listLength < 256) {
            this.writeInt8(constants.LIST_8);
            this.writeInt8(listLength);
        } else {
            this.writeInt8(constants.LIST_16)
            this.writeInt16(listLength);
        }
    }
    
    writeAttributes(attributes: Object): void {
        for(var key in attributes) {
            this.writeString(key);
            this.writeString(attributes[key]);
        }
    }

    // low level encoding methods
    writeInt8(value: number): void {
        if (value > 255 || value < 0) {
            throw "Bad value for writeInt8";
        }
        this.packet.push(value);
    }
    
    writeInt16(value: number): void {
        if (value > 65535 || value < 0) {
            throw "Bad value for writeInt16";
        }
        this.packet.push((value & 0xFF00) >> 8);
        this.packet.push(value & 0xFF);
    }
    
    writeInt24(value: number): void {
        if (value > 16777216 || value < 0) {
            throw "Bad value for writeInt16";
        }
        this.packet.push((value & 0xFF0000) >> 16);
        this.packet.push((value & 0xFF00) >> 8);
        this.packet.push(value & 0xFF);
    }
    
    writeBytes(bytes: Uint8Array): void {
        if (bytes.length > 255) {
            this.writeInt8(constants.BINARY_24);
            this.writeInt24(bytes.length);
        } else {
            this.writeInt8(constants.BINARY_8);
            this.writeInt8(bytes.length);
        }
        for(var i = 0; i < bytes.length; i++) {
            this.packet.push(bytes[i]);
        }
    }
    
    writeByteString(bytes: string): void {
        this.writeBytes(helpers.stringToArray(bytes));
    }
    
    writeString(value: string): void {
        var index = constants.DICTIONARY.indexOf(value);
        if (index < 0) {
            if (value.indexOf('@') > 0) {
                this.writeJID(value);
            } else {
                this.writeByteString(value);
            }
        }
        else if (index < 245) {
            this.writeInt8(index);
        } else {
            this.writeInt8(constants.TOKEN_8);
            this.writeInt8(index - 245);
        }
    }
    
    writeJID(jid: string): void {
        
    }
}

// read packets
export function parsePackets(inKeyStream: security.KeyStream, data: Uint8Array): Array<Uint8Array> {
    var i = 0;
    var packets = new Array<Uint8Array>();
    while(i < data.length) {
        var header = data[i];
        var flags = header >> 4;
        var size = (data[i+1] << 8) + data[i+2]
        var isEncrypted = (flags & 8) != 0;
        
        var packet = data.subarray(i + 3, i + 3 + size);
        if (isEncrypted && inKeyStream != null) {
            packet = inKeyStream.decrypt(packet);
        }
        packets.push(packet);
        i = i + 3 + size;
    }
    return packets;
}

export class PacketReader {
    private currentIndex = 0;
    private inputKey: string = null;

    constructor(private packet: Uint8Array) {
    }
    
    readInt8(): number {
        var num = this.packet[this.currentIndex];
        this.currentIndex++;
        return num;
    }

    readInt16(): number {
        var num = this.packet[this.currentIndex] << 8;
        this.currentIndex++;
        num += this.packet[this.currentIndex];
        this.currentIndex++;
        return num;
    }
    readInt24(): number {
        var num = this.packet[this.currentIndex] << 16;
        this.currentIndex++;
        num += this.packet[this.currentIndex] << 8;
        this.currentIndex++;
        num += this.packet[this.currentIndex];
        this.currentIndex++;
        return num;
    }

    readListSize(type: number): number {
        if (type == 0) {
            return 0;
        } else if (type == constants.LIST_8) {
            return this.readInt8();
        } else if (type == constants.LIST_16) {
            return this.readInt16();
        } else {
            throw "Bad value in readListSize()";
        }
    }

    readBytes(size: number): string {
        var str = "";
        for(var i = 0; i < size; i++) {
            str += String.fromCharCode(this.readInt8());
        }
        return str;
    }

    readString(token: number): string {
        if (token > 4 && token < 245) {
            return constants.DICTIONARY[token];
        }
        switch (token) {
            case 0:
                return null;
            case constants.BINARY_8: // string with length in next byte
                var size = this.readInt8();
                return this.readBytes(size);
            case constants.BINARY_24: // string with length in next 3 bytes
                var size = this.readInt24();
                return this.readBytes(size);
            case constants.TOKEN_8:
                token = this.readInt8();
                return constants.DICTIONARY[token + 245];
            case constants.JID_PAIR:
                var username = this.readString(this.readInt8());
                var server = this.readString(this.readInt8());
                return username + "@" + server
        }
        throw "Bad token in readString";
    }

    readAttributes(count: number): Object {
        var attributes = {};
        for (var i = 0; i < count; i++) {
            var key = this.readString(this.readInt8());
            var value = this.readString(this.readInt8());
            attributes[key] = value;
        }
        return attributes;
    }

    readBinaryXml(): Node {
        var size = this.readListSize(this.readInt8());
        var tag = this.readString(this.readInt8());
        var attribCount = (size - 2 + size % 2) / 2;
        var attributes = this.readAttributes(attribCount);

        var node : Node = null;
        if (size % 2 == 1) { // node without data/child nodes
            node = new Node(tag, attributes);
        } else {

            var b = this.readInt8();
            if (b == 0 || b == constants.LIST_8 || b == constants.LIST_16) {
                node = new Node(tag, attributes, this.readNodes(b)); // node with childs but no data
            } else {
                node = new Node(tag, attributes, [], helpers.stringToArray(this.readString(b))); // node with data but without childs
            }
        }
        return node;
    }

    private readNodes(type: number): Node[] {
        var size = this.readListSize(type);
        var childs = new Array<Node>();
        for (var i = 0; i < size; i++) {
            childs.push(this.readBinaryXml());
        }
        return childs;
    }

}



