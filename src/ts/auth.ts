/// <reference path="../lib/node.d.ts" />
import net = require("net");

import constants = require("./constants");
import packet_factory = require("./packet_factory");

function print(data: Uint8Array): string {
    var str: string = "";
    for(var i = 0; i < data.length; i++) {
        var c = data[i].toString(16);
        if (c.length == 1) {
            str += "0";
        }
        str += c;
        str += " ";
    }
    return str;
}

function arrayToBuffer(array: Uint8Array) {
    var buffer = new Buffer(array.length);
    for(var i = 0; i < array.length; i++) {
        buffer[i] = array[i];
    }
    return buffer;
}

export function auth(username: string, password: string): void {
    
    var socket = net.connect(constants.PORT, constants.HOST);
    
    socket.on("connect", function() {
        var data = packet_factory.helloPacket();
        socket.write(arrayToBuffer(data));
        
        var packet = packet_factory.streamStartPacket();
        socket.write(arrayToBuffer(packet.serialize()));
        
        packet = packet_factory.featuresPacket();
        socket.write(arrayToBuffer(packet.serialize()));
        
        packet = packet_factory.authPacket(username);
        socket.write(arrayToBuffer(packet.serialize()));
        
        // ret = 00 00 05 f8 03 01 41 ab 00 00 0d f8 02 bb f8 02 f8 01 9c f8 03 e4 cb 0c 00 00 1b f8 04 1b e8 cf fc 14 7a bd d7 6d 6c 0f ff bd 7f 26 9e 94 f9 7d f6 0b 89 07 72 84
    });
    
    socket.on("data", function(data) {
        console.log(print(data));
        console.log("");
        console.log("");
    });
}
