/// <reference path="../lib/node.d.ts" />
import constants = require("./constants");
import security = require("./security");
import packet_factory = require("./packet_factory");
import network = require("./network");
import helpers = require("./helpers");

enum ConnectionState {CONNECTED, CHALLENGE_SENT};

export class WhatsAppConnection {
    
    private platform: IPlatform;
    private socket: ISocket = null;
    private outKeyStream: security.KeyStream = null;
    private inKeyStream: security.KeyStream = null;
    private state: ConnectionState = null;
    
    onauth: {(): void};
    
    constructor(platform: IPlatform) {
        this.platform = platform;
    }
    
    private onSocketData(data: Uint8Array) {
        var packets = network.parsePackets(this.inKeyStream, data);
        if (this.state == ConnectionState.CONNECTED) {
            var reader = new network.PacketReader(packets[1]);
            reader = new network.PacketReader(packets[2]);
            var packet = reader.readBinaryXml();
            
            var nonce = helpers.arrayToString(packet.data);
            var key = security.keyFromPasswordNonce(this.platform.getCrypto(), this.platform.getCredentials().getPassword(), nonce);
            this.outKeyStream = new security.KeyStream(this.platform.getCrypto(), key);
            this.inKeyStream = new security.KeyStream(this.platform.getCrypto(), key);
            
            var authBlob = security.authBlob(this.platform.getCredentials().getUsername(), nonce);
            // hmac is in the first 4 bytes of the blob
            authBlob = this.outKeyStream.encrypt(authBlob, 4, 0);
    
            var challengePacket = packet_factory.challengePacket(authBlob);
            this.socket.write(challengePacket.serialize());
            this.state = ConnectionState.CHALLENGE_SENT;
        } else if(this.state == ConnectionState.CHALLENGE_SENT) {
            for(var i = 0; i < packets.length; i++) {
                var reader = new network.PacketReader(packets[i]);
                console.log(reader.readBinaryXml());
            }
            this.state = ConnectionState.CONNECTED;
        } else {
            for(var i = 0; i < packets.length; i++) {
                var reader = new network.PacketReader(packets[i]);
                console.log(reader.readBinaryXml());
            }
        }
    }
    
    private onSocketConnect() {
        var data = packet_factory.helloPacket();
        this.socket.write(data);
        
        var packet = packet_factory.streamStartPacket();
        this.socket.write(packet.serialize());
        
        packet = packet_factory.featuresPacket();
        this.socket.write(packet.serialize());
        
        packet = packet_factory.authPacket(this.platform.getCredentials().getUsername());
        this.socket.write(packet.serialize());
        
        this.state = ConnectionState.CONNECTED;
    }
    
    connect():void {
        this.socket = this.platform.getSocket();
        this.socket.onconnect = () => { this.onSocketConnect(); };
        this.socket.ondata = (data: Uint8Array) => { this.onSocketData(data); };
        this.socket.connect(constants.HOST, constants.PORT);
    }
    
    fetchContacts(): void {
        
    }
    
    
}
