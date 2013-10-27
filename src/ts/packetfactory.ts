module WA.Network {
    export class PacketFactory {
        
        
        static streamStartPacket(): Packet {
            var packet = new Packet();
            // protocol start
            packet.writeString("WA");
            packet.writeInt8(1);
            packet.writeInt8(2);
            
            // 00 00 12 => no clue what packet is....
            packet.writeInt8(0);
            packet.writeInt8(0);
            packet.writeInt8(0x12);
            
            // send stream attributes
            packet.listStart(5);
            packet.writeInt8(1);
            
            packet.writeString("to");
            packet.writeString(Constants.DOMAIN);
            packet.writeString("resource");
            
            // fc 0a => no clue what packet is....
            packet.writeInt8(0xFC);
            packet.writeInt8(0x0A);
            
            packet.writeString(Constants.TOKEN_DATA["r"]);
            
            var features = new Node("stream:features", {}, [
                new Node("receipt_acks"),
                new Node("w:profile:picture", {type: "all"}),
                new Node("w:profile:picture", {type: "group"}),
                new Node("notification", {type: "participant"}),
                new Node("status"),
            ]);
            
            packet.sendBinaryXml(features);
            
            return packet;
        }
    }
}
