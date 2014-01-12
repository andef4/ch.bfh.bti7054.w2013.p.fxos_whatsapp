/// <reference path="../lib/node.d.ts" />
import constants = require("./constants");
import security = require("./security");
import packet_factory = require("./packet_factory");
import network = require("./network");
import packet_parser = require("./packet_parser");
import helpers = require("./helpers");


export class WhatsAppConnection {
    
    private platform: IPlatform;
    private socket: ISocket;
    private outKeyStream: security.KeyStream = null;
    private inKeyStream: security.KeyStream = null;
    
    onauth: {(): void};
    
    constructor(platform: IPlatform) {
        this.platform = platform;
    }
    
    private ondata(data: Uint8Array) {
        var packets = packet_parser.parsePackets(data);

        var reader = new network.PacketReader(packets[1]);
        console.log(reader.readBinaryXml());
        
        reader = new network.PacketReader(packets[2]);
        var packet = reader.readBinaryXml();
        
        var nonce = helpers.arrayToString(packet.data);
        var key = security.keyFromPasswordNonce(this.platform.getCrypto(), this.platform.getCredentials().getPassword(), nonce);
        this.outKeyStream = new security.KeyStream(key);
        this.inKeyStream = new security.KeyStream(key);
        
        var authBlob = security.authBlob(this.platform.getCredentials().getUsername(), nonce);
        // hmac is in the first 4 bytes of the blob
        authBlob = this.outKeyStream.encrypt(authBlob, 4, authBlob.length-4, 0);

        var challengePacket = packet_factory.challengePacket(authBlob);
        this.socket.write(challengePacket.serialize());
    }
    
    private onconnect() {
        var data = packet_factory.helloPacket();
        this.socket.write(data);
        
        var packet = packet_factory.streamStartPacket();
        this.socket.write(packet.serialize());
        
        packet = packet_factory.featuresPacket();
        this.socket.write(packet.serialize());
        
        packet = packet_factory.authPacket(this.platform.getCredentials().getUsername());
        this.socket.write(packet.serialize());
    }
    
    connect() {
        this.socket = this.platform.getSocket();
        this.socket.onconnect = this.onconnect;
        this.socket.ondata = this.ondata;
        this.socket.connect(constants.HOST, constants.PORT);
    }
}
