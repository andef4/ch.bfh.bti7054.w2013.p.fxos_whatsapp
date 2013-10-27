var WA;
(function (WA) {
    (function (Network) {
        var PacketFactory = (function () {
            function PacketFactory() {
            }
            PacketFactory.streamStartPacket = function () {
                var packet = new Network.Packet();

                packet.writeString("WA");
                packet.writeInt8(1);
                packet.writeInt8(2);

                packet.writeInt8(0);
                packet.writeInt8(0);
                packet.writeInt8(0x12);

                packet.listStart(5);
                packet.writeInt8(1);

                packet.writeString("to");
                packet.writeString(WA.Constants.DOMAIN);
                packet.writeString("resource");

                packet.writeInt8(0xFC);
                packet.writeInt8(0x0A);

                packet.writeString(WA.Constants.TOKEN_DATA["r"]);

                var features = new Network.Node("stream:features", {}, [
                    new Network.Node("receipt_acks"),
                    new Network.Node("w:profile:picture", { type: "all" }),
                    new Network.Node("w:profile:picture", { type: "group" }),
                    new Network.Node("notification", { type: "participant" }),
                    new Network.Node("status")
                ]);

                packet.sendBinaryXml(features);

                return packet;
            };
            return PacketFactory;
        })();
        Network.PacketFactory = PacketFactory;
    })(WA.Network || (WA.Network = {}));
    var Network = WA.Network;
})(WA || (WA = {}));
