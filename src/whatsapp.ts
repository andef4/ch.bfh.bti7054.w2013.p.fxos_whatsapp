module WA.Network {
    export class Stream {
        private packet: number[] = [];
        
        start(): void {
            // protocol start
            this.writeString("WA");
            this.writeInt8(1);
            this.writeInt8(2);
            
            // 00 00 12 => no clue what this is....
            this.writeInt8(0);
            this.writeInt8(0);
            this.writeInt8(0x12);
            
            // send stream attributes
            this.listStart(5);
            this.writeInt8(1);
            
            this.writeString("to");
            this.writeString(Constants.DOMAIN);
            this.writeString("resource");
            
            // fc 0a => no clue what this is....
            this.writeInt8(0xFC);
            this.writeInt8(0x0A);
            
            this.writeString(Constants.TOKEN_DATA["r"]);
        }
        
        getPacket(): Uint8Array {
            var array = new Uint8Array(this.packet.length);
            for(var i = 0; i < this.packet.length; i++) {
                array[i] = this.packet[i];
            }
            return array;
        }
        
        
        
        // high level encoding methods
        
        /*
            def writeInternal(self,node):
        '''define write internal here'''
        
        self.writeListStart(1 + (0 if node.attributes is None else len(node.attributes) * 2) + (0 if node.children is None else 1) + (0 if node.data is None else 1));
        
        self.writeString(node.tag);
        self.writeAttributes(node.attributes);
        
        if node.data is not None:
            self.writeBytes(node.data)
            '''if type(node.data) == bytearray:
                self.writeBytes(node.data);
            else:
                self.writeBytes(bytearray(node.data));
            '''
        
        if node.children is not None:
            self.writeListStart(len(node.children));
            for c in node.children:
                self.writeInternal(c);
        */
        sendBinaryXml(rootNode: WA.XML.Node) {
            var length = 1;
            length += Object.keys(rootNode.attrs).length * 2;
            if (rootNode.childs.length) {
                length =+ 1;
            }
            this.listStart(length);
            this.writeString(rootNode.name);
            this.writeAttributes(rootNode.attrs);
            // TODO handle node data
            // TODO handle children
        }
        
        private listStart(listLength: number): void {
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
        
        private writeAttributes(attributes: Object): void {
            for(var key in attributes) {
                this.writeString(key);
                this.writeString(attributes[key]);
            }
        }

        // low level encoding methods
        private writeInt8(value: number): void {
            if (value > 255 || value < 0) {
                throw "Bad value for writeInt8";
            }
            this.packet.push(value);
        }
        
        private writeInt16(value: number): void {
            if (value > 65535 || value < 0) {
                throw "Bad value for writeInt16";
            }
        }
        
        private writeString(value: string): void {
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
        
        private writeJID(jid: string): void {
            
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


var stream = new WA.Network.Stream();
stream.start();


var features = new WA.XML.Node("stream:features", {}, [
    new WA.XML.Node("receipt_acks"),
    new WA.XML.Node("w:profile:picture", {type: "all"}),
    new WA.XML.Node("w:profile:picture", {type: "group"}),
    new WA.XML.Node("notification", {type: "participant"}),
    new WA.XML.Node("status"),
]);


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
