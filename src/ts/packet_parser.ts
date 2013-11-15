import network = require('./network');


export function parsePackets(data: Uint8Array): Array<Uint8Array> {
    var i = 0;
    
    var packets = new Array<Uint8Array>();
    
    while(i < data.length) {
        var length = (data[i] << 16) + (data[i+1] << 8) + data[i+2];
        packets.push(data.subarray(i + 3, i + 3 + length));
        i = i + 3 + length;
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

var packet = "00 00 05 f8 03 01 41 ab 00 00 0d f8 02 bb f8 02 f8 01 9c f8 03 e4 cb 0c 00 00 1b f8 04 1b e8 cf fc 14 7a bd d7 6d 6c 0f ff bd 7f 26 9e 94 f9 7d f6 0b 89 07 72 84"

var splits = packet.split(" ");

var data = new Uint8Array(splits.length);
for(var i = 0; i < splits.length; i++) {
    data[i] = parseInt(splits[i], 16);
}

var packets = parsePackets(data);

var reader = new network.PacketReader(packets[1]);
console.log(reader.readBinaryXml())
//console.log(reader.read);



