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
        start() {
            var streamOpenAttributes = {to: Constants.domain, resource: Constants.tokenData["r"]};
            packet = 'WA\01\02' + this.listStart(5) + this.writeInt8(1) + this.writeAttributes(streamOpenAttributes);
            return packet
        }
        
        // high level encoding methods
        private listStart(listLength: number) {
            if (listLength == 0) {
                return this.writeInt8(0);
            } else if (listLength < 256) {
                return this.writeInt8(248) + this.writeInt8(listLength);
            } else {
                return this.writeInt8(249) + this.writeInt16(listLength);
            }
            return "";
        }
        
        private writeAttributes(attributes: Object) {
            // TODO
            return "";
        }

        // low level encoding methods
        private writeInt8(value: number) {
            // TODO
            return "";
        }
        
        private writeInt16(value: number) {
            // TODO
            return "";
        }
        
        private writeString(value: string) {
            // TODO
            return "";
        }
        
        private 
    }
}

function encode(packet: string) {
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







