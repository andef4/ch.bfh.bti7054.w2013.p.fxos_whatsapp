import network = require('./network');


export function parsePackets(data: Uint8Array): Array<Uint8Array> {
    var i = 0;
    var packets = new Array<Uint8Array>();
    while(i < data.length) {
        var header = data[i];
        var flags = header >> 4;
        var size = (data[i+1] << 8) + data[i+2]
        var isEncrypted = (flags & 8) != 0;
        if (isEncrypted && this.inputKey != null) {
            //this.decryptPacket();
        }
        packets.push(data.subarray(i + 3, i + 3 + size));
        i = i + 3 + size;
    }
    return packets;
}

export function streamStartPacket(data: Uint8Array): void {
    
}

export function featuresPacket(data: Uint8Array): void {
    
}

export function challengePacket(data: Uint8Array): Uint8Array {
    return null;
}


var packet = "00 00 05 f8 03 01 41 ab 00 00 0d f8 02 bb f8 02 f8 01 9c f8 03 e4 cb 0c 00 00 1b f8 04 1b e8 cf fc 14 8a 06 a1 07 bf 5b 6f 41 ec 9e a9 ef ee ec 5a 49 fc 6e 48 c9"

var splits = packet.split(" ");

var data = new Uint8Array(splits.length);
for(var i = 0; i < splits.length; i++) {
    data[i] = parseInt(splits[i], 16);
}

var packets = parsePackets(data);

var reader = new network.PacketReader(packets[1]);
console.log(reader.readBinaryXml());

reader = new network.PacketReader(packets[2]);
console.log(reader.readBinaryXml());

//console.log(reader.read);



