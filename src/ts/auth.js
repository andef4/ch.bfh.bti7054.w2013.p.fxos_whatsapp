var WA;
(function (WA) {
    (function (Auth) {
        function auth(username, password) {
            var packet = WA.Network.PacketFactory.streamStartPacket();
            var data = packet.serialize();

            var str = "";
            for (var i = 0; i < data.length; i++) {
                var c = data[i].toString(16);
                if (c.length == 1) {
                    str += "0";
                }
                str += c;
                str += " ";
            }
            document.getElementById("content").innerHTML = str;
        }
        Auth.auth = auth;
    })(WA.Auth || (WA.Auth = {}));
    var Auth = WA.Auth;
})(WA || (WA = {}));

WA.Auth.auth("1234", "1234");
