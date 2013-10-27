module WA.Network {
    
    
    
    export class Node {
        constructor(public name: string, public attrs: Object = {}, public childs: Node[] = []) {}
    }
    
    export class Packet {
        private packet: number[] = [];
        
        serialize(): Uint8Array {
            var array = new Uint8Array(this.packet.length);
            for(var i = 0; i < this.packet.length; i++) {
                array[i] = this.packet[i];
            }
            return array;
        }
        
        sendBinaryXml(node: Node) {
            var length = 1;
            length += Object.keys(node.attrs).length * 2;
            if (node.childs.length) {
                length =+ 1;
            }
            this.listStart(length);
            this.writeString(node.name);
            this.writeAttributes(node.attrs);
            
            // TODO handle node data
            
            if (node.childs.length) {
                this.listStart(node.childs.length);
                node.childs.forEach(child => this.sendBinaryXml(child));
            }
        }
        
        listStart(listLength: number): void {
            if (listLength == 0) {
                this.writeInt8(Constants.LIST_EMPTY);
            } else if (listLength < 256) {
                this.writeInt8(Constants.LIST_8);
                this.writeInt8(listLength);
            } else {
                this.writeInt8(Constants.LIST_16)
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
        }
        
        writeString(value: string): void {
            var index = Constants.DICTIONARY.indexOf(value);
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

/*function encode(packet: string) {
    console.log(packet);
}



var packet = 
'<stream:features>' +
    '<receipt_acks>' +
    '</receipt_acks>' +
    '<w:profile:picture type="all">' +
    '</w:profile:picture>' +
    '<w:profile:picture type="group">' +
    '</w:profile:picture>' +
    '<notification type="participant">' +
    '</notification>' +
    '<status>' +
    '</status>' +
'</stream:features>'

encode(packet);

var stream = new WA.Stream();
*/
/*
var streamStartPacket = new WA.Network.Packet();

var stream = new WA.Network.Stream();
stream.start();


var features = new WA.XML.Node("stream:features", {}, [
    new WA.XML.Node("receipt_acks"),
    new WA.XML.Node("w:profile:picture", {type: "all"}),
    new WA.XML.Node("w:profile:picture", {type: "group"}),
    new WA.XML.Node("notification", {type: "participant"}),
    new WA.XML.Node("status"),
]);

stream.sendBinaryXml(features);


var packet = stream.getPacket();
var str: string = "";
for(var i = 0; i < packet.length; i++) {
    var c = packet[i].toString(16);
    if (c.length == 1) {
        str += "0";
    }
    str += c;
    str += " ";
}

document.getElementById("content").innerHTML = str;
*/
