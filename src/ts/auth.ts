/// <reference path="../lib/node.d.ts" />
import net = require("net");

import constants = require("./constants");
import security = require("./security");
import packet_factory = require("./packet_factory");
import network = require("./network");
import packet_parser = require("./packet_parser");
import helpers = require("./helpers");

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

function arrayToBuffer(array: Uint8Array): NodeBuffer {
    var buffer = new Buffer(array.length);
    for(var i = 0; i < array.length; i++) {
        buffer[i] = array[i];
    }
    return buffer;
}

function bufferToArray(buffer: NodeBuffer): Uint8Array {
    var array = new Uint8Array(buffer.length);
    for(var i = 0; i < buffer.length; i++) {
        array[i] = buffer[i];
    }
    return array;
}


export function auth(username: string, password: string): void {
    
    var socket = net.connect(constants.PORT, constants.HOST);
    var outKeyStream: security.KeyStream = null;
    var inKeyStream: security.KeyStream = null;
    
    socket.on("connect", function() {
        var data = packet_factory.helloPacket();
        socket.write(arrayToBuffer(data));
        
        var packet = packet_factory.streamStartPacket();
        socket.write(arrayToBuffer(packet.serialize()));
        
        packet = packet_factory.featuresPacket();
        socket.write(arrayToBuffer(packet.serialize()));
        
        packet = packet_factory.authPacket(username);
        socket.write(arrayToBuffer(packet.serialize()));
        
    });
    
    socket.on("data", function(data: NodeBuffer) {
        var packets = packet_parser.parsePackets(bufferToArray(data));

        var reader = new network.PacketReader(packets[1]);
        console.log(reader.readBinaryXml());
        
        reader = new network.PacketReader(packets[2]);
        var packet = reader.readBinaryXml();
        
        var nonce = helpers.arrayToString(packet.data);
        var key = security.keyFromPasswordNonce(password, nonce);
        outKeyStream = new security.KeyStream(key);
        inKeyStream = new security.KeyStream(key);
        
        var authBlob = security.authBlob(username, nonce);
        // hmac is in the first 4 bytes of the blob
        authBlob = outKeyStream.encrypt(authBlob, 4, authBlob.length-4, 0);
        
        var challengePacket = packet_factory.challengePacket(authBlob);
        socket.write(arrayToBuffer(challengePacket.serialize()));
    });
}
