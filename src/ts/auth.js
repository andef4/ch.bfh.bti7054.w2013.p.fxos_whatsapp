var WA;
(function (WA) {
    (function (Auth) {
        function print(data) {
            var str = "";
            for (var i = 0; i < data.length; i++) {
                var c = data[i].toString(16);
                if (c.length == 1) {
                    str += "0";
                }
                str += c;
                str += " ";
            }
            return str;
        }

        function auth(username, password) {
            var data = WA.Network.PacketFactory.helloPacket();
            var str = print(data);

            var packet = WA.Network.PacketFactory.streamStartPacket();
            data = packet.serialize();
            str += print(data);

            packet = WA.Network.PacketFactory.featuresPacket();
            data = packet.serialize();
            str += print(data);

            packet = WA.Network.PacketFactory.authPacket(username);
            data = packet.serialize();
            str += print(data);

            document.getElementById("content").innerHTML = str;
        }
        Auth.auth = auth;
    })(WA.Auth || (WA.Auth = {}));
    var Auth = WA.Auth;
})(WA || (WA = {}));

WA.Auth.auth("1234", "1234");
