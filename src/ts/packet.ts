module WA.Network {
    
    export class Node {
        constructor(public name: string, public attrs: Object = {}, public childs: Node[] = []) {}
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
            this.listStart(length);
            this.writeString(node.name);
            this.writeAttributes(node.attrs);
            
            // TODO handle node data
            
            if (node.childs.length) {
                this.listStart(node.childs.length);
                node.childs.forEach(child => this.writeBinaryXml(child));
            }
        }
        
        listStart(listLength: number): void {
            if (listLength == 0) {
                this.writeInt8(WA.Constants.LIST_EMPTY);
            } else if (listLength < 256) {
                this.writeInt8(WA.Constants.LIST_8);
                this.writeInt8(listLength);
            } else {
                this.writeInt8(WA.Constants.LIST_16)
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
        
        writeString(value: string): void {
            var index = WA.Constants.DICTIONARY.indexOf(value);
            if (index < 0) {
                if (value.indexOf('@') > 0) {
                    this.writeJID(value);
                } else {
                    for(var i = 0; i < value.length; i++) {
                        this.packet.push(value.charCodeAt(i));
                    }
                }
            }
            else if (index < 245) {
                this.writeInt8(index);
            } else {
                this.writeInt8(Constants.TOKEN_8);
                this.writeInt8(index - 245);
            }
        }
        
        writeJID(jid: string): void {
            
        }
    }
}
