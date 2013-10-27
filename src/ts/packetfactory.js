var WA;
(function (WA) {
    (function (Network) {
        var PacketFactory = (function () {
            function PacketFactory() {
            }
            PacketFactory.helloPacket = function () {
                var packet = new Uint8Array(4);
                packet[0] = 0x57;
                packet[1] = 0x41;
                packet[2] = 0x01;
                packet[3] = 0x02;
                return packet;
            };

            PacketFactory.streamStartPacket = function () {
                var packet = new Network.Packet();
                packet.listStart(5);
                packet.writeInt8(1);
                var streamAttributes = { to: WA.Constants.DOMAIN, resource: WA.Constants.TOKEN_DATA["r"] };
                packet.writeAttributes(streamAttributes);
                return packet;
            };

            PacketFactory.featuresPacket = function () {
                var packet = new Network.Packet();
                var features = new Network.Node("stream:features", {}, [
                    new Network.Node("receipt_acks"),
                    new Network.Node("w:profile:picture", { type: "all" }),
                    new Network.Node("w:profile:picture", { type: "group" }),
                    new Network.Node("notification", { type: "participant" }),
                    new Network.Node("status")
                ]);
                packet.writeBinaryXml(features);
                return packet;
            };

            PacketFactory.authPacket = function (username) {
                var packet = new Network.Packet();
                var auth = new Network.Node("auth", {
                    user: username,
                    xmlns: "urn:ietf:params:xml:ns:xmpp-sasl",
                    mechanism: "WAUTH-1"
                });
                packet.writeBinaryXml(auth);
                return packet;
            };
            return PacketFactory;
        })();
        Network.PacketFactory = PacketFactory;
    })(WA.Network || (WA.Network = {}));
    var Network = WA.Network;
})(WA || (WA = {}));
