import network = require("./network");
import constants = require("./constants");
import helpers = require("./helpers");

export function helloPacket(): Uint8Array {
    var packet = new Uint8Array(4);
    packet[0] = 0x57; // W
    packet[1] = 0x41; // A
    packet[2] = 0x01; // Protocol version 1.2
    packet[3] = 0x02;
    return packet;
}

export function streamStartPacket(): network.Packet {
    var packet = new network.Packet();
    packet.listStart(5);
    packet.writeInt8(1);
    var streamAttributes = {to: constants.DOMAIN, resource: constants.TOKEN_DATA["r"]};
    packet.writeAttributes(streamAttributes);
    return packet;
}

export function featuresPacket(): network.Packet {
    var packet = new network.Packet();
    var features = new network.Node("stream:features", {}, [
        new network.Node("receipt_acks"),
        new network.Node("w:profile:picture", {type: "all"}),
        new network.Node("w:profile:picture", {type: "group"}),
        new network.Node("notification", {type: "participant"}),
        new network.Node("status"),
    ]);
    packet.writeBinaryXml(features);
    return packet;
}

export function authPacket(username: string): network.Packet {
    var packet = new network.Packet();
    var auth = new network.Node("auth", {
        user: username,
        xmlns: "urn:ietf:params:xml:ns:xmpp-sasl",
        mechanism: "WAUTH-1",
    }, [], new Uint8Array(0));
    packet.writeBinaryXml(auth);
    return packet;
}

export function challengePacket(authBlob: Uint8Array): network.Packet {
    var packet = new network.Packet();
    var auth = new network.Node("response", {
        xmlns: "urn:ietf:params:xml:ns:xmpp-sasl",
    }, [], authBlob);
    packet.writeBinaryXml(auth);
    return packet;
}

export function messageChatPacket(to: string, message: string, msgId: string): network.Packet {
    var packet = new network.Packet();
    
    var server = new network.Node("server");
    var x = new network.Node("x", {"xmlns":"jabber:x:event"}, [server]);
    var body = new network.Node("body", {}, [], helpers.stringToArray(message));
    var xml = new network.Node("message", {"to": to, "type": "chat", "id": msgId}, [body, x]);
    
    packet.writeBinaryXml(xml);
    return packet;
}
