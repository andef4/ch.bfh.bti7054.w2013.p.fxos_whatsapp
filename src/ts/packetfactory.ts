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
            // send stream attributes
            packet.listStart(5);
            packet.writeInt8(1);
            
            packet.writeString("to");
            packet.writeString(Constants.DOMAIN);
            packet.writeString("resource");
            
            // fc 0a => no clue what this is....
            packet.writeInt8(0xFC);
            packet.writeInt8(0x0A);
            
            packet.writeString(Constants.TOKEN_DATA["r"]);
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
