module WA.Network {
    export class PacketFactory {
        
        static helloPacket(): Uint8Array {
            var packet = new Uint8Array(4);
            packet[0] = 0x57; // W
            packet[1] = 0x41; // A
            packet[2] = 0x01; // Protocol version 1.2
            packet[3] = 0x02;
            return packet;
        }
        
        static streamStartPacket(): Packet {
            var packet = new Packet();
            packet.listStart(5);
            packet.writeInt8(1);
            var streamAttributes = {to: WA.Constants.DOMAIN, resource: WA.Constants.TOKEN_DATA["r"]};
            packet.writeAttributes(streamAttributes);
            return packet;
        }
        
        static featuresPacket(): Packet {
            var packet = new Packet();
            var features = new Node("stream:features", {}, [
                new Node("receipt_acks"),
                new Node("w:profile:picture", {type: "all"}),
                new Node("w:profile:picture", {type: "group"}),
                new Node("notification", {type: "participant"}),
                new Node("status"),
            ]);
            packet.writeBinaryXml(features);
            return packet;
        }
        
        static authPacket(username: string): Packet {
            var packet = new Packet();
            var auth = new Node("auth", {
                user: username,
                xmlns: "urn:ietf:params:xml:ns:xmpp-sasl",
                mechanism: "WAUTH-1",
            });
            packet.writeBinaryXml(auth);
            return packet;
        }
    }
}
