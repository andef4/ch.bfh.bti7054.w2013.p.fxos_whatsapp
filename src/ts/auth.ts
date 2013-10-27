
module WA.Auth {
    export function auth(username: string, password: string) {
        var packet = WA.Network.PacketFactory.streamStartPacket();
        var data = packet.serialize();
        
        var str: string = "";
        for(var i = 0; i < data.length; i++) {
            var c = data[i].toString(16);
            if (c.length == 1) {
                str += "0";
            }
            str += c;
            str += " ";
        }
        document.getElementById("content").innerHTML = str;
    }
}

WA.Auth.auth("1234", "1234");



