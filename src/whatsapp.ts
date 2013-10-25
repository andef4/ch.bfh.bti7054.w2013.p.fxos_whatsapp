module WA {
    class WhatsApp {
        port: number;
        host: string;
        
        constructor() {
            this.port = 443;
            this.host = 'c2.whatsapp.net';
        }
    }
    
    export class Stream {
        private packet: number[] = [];
        start(): void {
            // protocol start
            this.writeString("WA");
            this.writeInt8(1);
            this.writeInt8(2);
            
            // 00 00 12     f8 05
            this.writeInt8(0);
            this.writeInt8(0);
            this.writeInt8(18);
            
            // send stream attributes
            this.listStart(5);
            this.writeInt8(1);
            
            this.writeString("to");
            this.writeString(Constants.domain);
            this.writeString("resource");
            this.writeString(Constants.tokenData["r"]);
            
            //var streamOpenAttributes = {to: Constants.domain, resource: Constants.tokenData["r"]};
            //this.writeAttributes(streamOpenAttributes);
        }
        
        getPacket(): Uint8Array {
            var array = new Uint8Array(this.packet.length);
            for(var i = 0; i < this.packet.length; i++) {
                array[i] = this.packet[i];
            }
            return array;
        }
        
        // high level encoding methods
        private listStart(listLength: number): void {
            if (listLength == 0) {
                this.writeInt8(0);
            } else if (listLength < 256) {
                this.writeInt8(248);
                this.writeInt8(listLength);
            } else {
                this.writeInt8(249)
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
            for(var i = 0; i < value.length; i++) {
                this.packet.push(value.charCodeAt(i));
            }
        }
        
    }
}

/*function encode(packet: string) {
    console.log(packet);
}



var packet = '<stream:features>' +
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


var stream = new WA.Stream();
stream.start();
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
